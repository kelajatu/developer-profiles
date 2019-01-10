const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const app = require("../index.js");

describe("Index.js", () => {
  it("Can make a get request", () => {
    chai.request(app).get("/");
  });
});
