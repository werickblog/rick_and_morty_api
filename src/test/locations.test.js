import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import app, { stop } from "../app";
import Location from "../model/location";

const { expect } = chai;
chai.use(chaiHttp);

after(done => {
  mongoose.connection.dropDatabase();
  mongoose.disconnect(done);
  stop(done);
});

describe("Location controllers", () => {
  describe("GET /locations", () => {
    it("should get all locations from an API", done => {
      chai
        .request(app)
        .get("/api/v1/locations")
        .end((err, res) => {
          expect(res.status).to.equals(200);
          expect(typeof res.body.locations).to.equals("object");
          done();
        });
    });
  });

  describe("GET /locations/:id", () => {
    it("should fetch a non existing location", done => {
      chai
        .request(app)
        .get("/api/v1/locations/10000")
        .end((err, res) => {
          expect(res.status).to.equals(404);
          expect(res.body.message).to.equals(
            "Location was not found please, suggest to erick@werick.codes"
          );
          done();
        });
    });

    it("should fetch an existing character", done => {
      const location = new Location({
        name: "test",
        type: "test",
        bio: "test",
        dimension: "test",
        url: "test",
        location_id: 1
      });
      location.save().then(() => {
        chai
          .request(app)
          .get("/api/v1/locations/1")
          .end((err, res) => {
            expect(res.status).to.equals(200);
            done();
          });
      });
    });
  });
});
