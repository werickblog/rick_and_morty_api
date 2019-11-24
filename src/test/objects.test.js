import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import app, { stop } from "../app";
import Tool from "../model/object";

const { expect } = chai;
chai.use(chaiHttp);

after(done => {
  mongoose.connection.dropDatabase();
  mongoose.disconnect(done);
  stop(done);
});

describe("Object controllers", () => {
  describe("GET /objects", () => {
    it("should get all objects from an API", done => {
      chai
        .request(app)
        .get("/api/v1/objects")
        .end((err, res) => {
          expect(res.status).to.equals(200);
          done();
        });
    });
  });

  describe("/GET /objects/:id", () => {
    it("should get a single object from an API", done => {
      chai
        .request(app)
        .get("/api/v1/objects/1000")
        .end((err, res) => {
          expect(res.status).to.equals(404);
          done();
        });
    });

    it("should fetch an existing object", done => {
      const object = new Tool({
        name: "test",
        status: "test",
        bio: "test",
        object_id: 1
      });

      object.save().then(() => {
        chai
          .request(app)
          .get("/api/v1/objects/1")
          .end((err, res) => {
            expect(res.status).to.equals(200);
            done();
          });
      });
    });
  });
});
