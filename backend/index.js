const express = require("express");
const routes = require("./routes/routes.js");
const stripe = require("stripe")("pk_test_8GJbtgDBTy9PWsnFvDsQo8e7");
const server = express();
require("dotenv").config();

express.use(require("body-parser").text());
server.use(express.json());

let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 7000;
}

server.get("/", (req, res) => {
  res.send("NICE. The api is up and running.");
});

server.use("/", routes);

express.post("/charge", async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});

server.listen(PORT, () => {
  // console.log("process.env", process.env)
  console.log(
    `\n == server is running on ${PORT} == \n == using the ${
      process.env.NODE_ENV
    } database == \n`
  );
});
