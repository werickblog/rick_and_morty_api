import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import app, { stop } from "../app";
import Quotes from "../model/quote";

const { expect } = chai;
chai.use(chaiHttp);

after(done => {
  mongoose.connection.dropDatabase();
  mongoose.disconnect(done);
  stop(done);
});

describe("Quote controller", () => {
  describe("GET /quotes", () => {
    it("should get all quotes from an API", done => {
      chai
        .request(app)
        .get("/api/v1/quotes")
        .end((err, res) => {
          expect(res.status).to.equals(200);
          done();
        });
    });
  });

  describe("GET /quotes/:id", () => {
    it("should get not found quote", done => {
      chai
        .request(app)
        .get("/api/v1/quotes/1100")
        .end((err, res) => {
          expect(res.status).to.equals(404);
          done();
        });
    });

    it("should get an existing quote", done => {
      const quote = new Quotes({
        quote: "test",
        bio: "test",
        quote_id: 1
      });

      quote.save().then(() => {
        chai
          .request(app)
          .get("/api/v1/quotes/1")
          .end((err, res) => {
            expect(res.status).to.equals(200);
            done();
          });
      });
    });
  });
});
