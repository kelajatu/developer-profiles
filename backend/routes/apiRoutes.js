require('dotenv').config()
const knex = require("knex");
const dbconfig = require("../knexfile");
// need helper to get all skills
const db = require('../helpers/index.js')
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const axios = require('axios');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const stripe = require("stripe")(process.env.STRIPE_TEST);

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

// AWS image upload
aws.config.update({
    secretAccessKey: process.env.AWS_PIC_SECRET_KEY,
    accessKeyId: process.env.AWS_PIC_ACCESS_KEY,
    region: 'us-east-2'
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'dev-profile-user-profile-images',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

const singleImageUpload = upload.single('image');

server.post('/image-upload', (req, res) => {
  // console.log(req.body)
  singleImageUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    }
    return res.json({'imgUrl': req.file.location})
  });
});


// google services
const key = process.env.GOOGLE_AUTO_COMPLETE

server.post('/location', (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.body.inputLocation}&types=(cities)&key=${key}`;
  axios.post(url)
  .then(response => {
    // console.log(response.data)
    res.send(response.data) // <= send data to the client
  })
  .catch(err => {
    console.log(err)
    res.send({ err }) // <= send error
  })
});

server.post('/gio', (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.body.placeId}&fields=geometry&key=${key}`
  axios.post(url)
  .then(response => {
    console.log(response.data)
    res.send(response.data) // <= send data to the client
  })
  .catch(err => {
    console.log(err)
    res.send({ err }) // <= send error
  })
});


// acclaim
server.put("/acclaim/:id", (req, res) => {
    let id = req.params.id
    console.log(req.body)
    axios.get(`https://api.youracclaim.com/v1/obi/badge_assertions/${req.body.badge}`).then(response => {
        db.user_helpers.editUser(id, {badge: response.data.image}).then(data => {
          console.log(data)
        res.status(200).json(data)
        })
    }).catch(err => {
    console.log(err);
    res.send({ err });
    });
});

// // stripe
// server.post('/billing', (req, res) => {
//   const { stripeToken } = req.body;
//   console.log(stripeToken)
//   const charge = stripe.charges.create({
//     amount: 999,
//     currency: 'usd',
//     description: 'Example charge',
//     source: stripeToken,
//   }).then(charge => res.send(charge)).catch(err => console.log(err));
// });





// stripe
server.post('/create-customer', (req, res) => {
  const { stripeToken, userEmail } = req.body;
  stripe.customers.create({
    description: `Customer for ${userEmail}`,
    source: stripeToken
  }, function(err, customer) {
      if (err) {
        console.log(err)
      } else {
        res.send(customer)
      }
  });
});


server.post('/subscribe-customer', (req, res) => {
  const { customerId, packageSelected } = req.body;
  if (packageSelected === 'month') {
    stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          plan: "plan_ET8f6n9L0GqW57",
        },
      ]
    }, function(err, subscription) {
        if (err) {
          console.log(err)
          res.send('ERROR')
        } else {
          res.send(subscription)
        }
      }
    );
  } else if (packageSelected === 'year') {
    stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          plan: "plan_ET8hisB865nPaL",
        },
      ]
    }, function(err, subscription) {
        if (err) {
          console.log(err)
          res.send('ERROR')
        } else {
          res.send(subscription)
        }
      }
    );
  } else {
    res.send('Error')
  }
});


module.exports = server 
