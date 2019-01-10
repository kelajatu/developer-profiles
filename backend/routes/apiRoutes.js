const express = require('express');
const axios = require('axios');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const server = express.Router()


// AWS Config, need to move keys to .env
aws.config.update({
  secretAccessKey: 'VCZIQLZpx+0/yRnC+IA+tIbQPu3901VBOIfnllYX',
  accessKeyId: 'AKIAIHZRWWYBXY72R7JQ',
  region: 'us-east-2'
});

const s3 = new aws.S3();


// multer setup for single image upload
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'dev-profile-user-profile-images',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_META_DATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

const singleImageUpload = upload.single('image');


// single image upload request
server.post('/image-upload', (req, res) => {
  singleImageUpload(req, res, function(err) {
    if (err) {
      return res.status(422).json({errors: "Image Upload Error", err: message});
    }
    return res.json({'imgUrl': req.file.location})
  });
});



// google key, need to move to .env
const key = 'AIzaSyBb8qdcjPWdlsz1qvsbjz4s821Tct8vTn8'

server.post('/location', (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.body.inputLocation}&key=${key}`;
  axios.post(url)
  .then(response => {
    console.log(response.data)
    res.send(response.data)
  })
  .catch(err => {
    console.log(err)
    res.send({ err })
  })
});


// Each place has an ID, you can grab the ID from the Autocomplete, and just put an array of IDs of the origins to 
// calculate distances, instead of having to put gio codes or text addresses
// split array with |

server.post('/matrix', (req, res) => {
  // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY|Los+Angeles,CA&key=${key}`;

  let locationOrigin;
  let destinations;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${locationOrigin}&destinations=${destinations}&key=${key}`;


  axios.post(url)
  .then(response => {
    console.log(response.data)
    res.send(response.data)
  })
  .catch(err => {
    console.log(err)
    res.send({ err })
  })
});
