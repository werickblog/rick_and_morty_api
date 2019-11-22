// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const mongoose = require('mongoose')
// const app = require('../index')
import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import app, { stop } from "../app";

const { expect } = chai;
chai.use(chaiHttp);

after(done => {
  mongoose.disconnect(done);
  stop(done);
});

describe("Sample test", () => {
  it("should test that true === true", done => {
    expect(true).to.equals(true);
    done();
  });
});
