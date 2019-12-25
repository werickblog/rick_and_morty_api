import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import app, { stop } from "../app";
import Character from "../model/character";
import Location from "../model/location";

const { expect } = chai;
chai.use(chaiHttp);

after(done => {
  mongoose.connection.dropDatabase();
  mongoose.disconnect(done);
  stop(done);
});

describe("Character tests suite", () => {
  describe("GET /characters", () => {
    it("should get all characters from an API", done => {
      chai
        .request(app)
        .get("/api/v1/characters")
        .end((err, res) => {
          expect(res.status).to.equals(200);
          expect(typeof res.body.characters).to.equals("object");
          done();
        });
    });
  });

  describe("GET /characters/:id", () => {
    // Fetch non existing character
    it("should fetch a non existing character", done => {
      chai
        .request(app)
        .get("/api/v1/characters/10000")
        .end((err, res) => {
          expect(res.status).to.equals(404);
          expect(res.body.message).to.equals(
            "Character was not found please, suggest to erick@werick.codes"
          );
          done();
        });
    });
    // existing character
    it("should fetch an existing character", done => {
      const character = new Character({
        name: "test",
        aka: "test",
        species: "test",
        age: 40,
        url: "test",
        character_id: 1,
        status: 'test',
        occupation: 'test',
        image: 'string',
        dimension: 'test',
        bio: 'test',
        gender: 'test'
      });
      character.save().then(() => {
        chai
          .request(app)
          .get("/api/v1/characters/1")
          .end((err, res) => {
            expect(res.status).to.equals(200);
            done();
          });
      });
    });
  });

  describe("POST/PUT/DELETE /admin/functions/add-character", () => {
    
  })
});
