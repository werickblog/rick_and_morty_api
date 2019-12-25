import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import app, { stop } from "../app";
import Soul from "../model/soul";
import { jwtSignature } from "../api/admin/helpers/jwt";

const { expect } = chai;
chai.use(chaiHttp);

after(done => {
  mongoose.connection.dropDatabase();
  mongoose.disconnect(done);
  stop(done);
});

describe("Auth Controller", () => {
  describe("POST /admin/functions/create", () => {
    it("should register an admin", done => {
      const payload = {
        username: "test",
        email: "ewachira254@gmail.com",
        password: "@testing254"
      };
      chai
        .request(app)
        .post("/admin/functions/create")
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equals(201);
          done();
        });
    });

    it("should not register with wrong username", done => {
      const payload = {
        username: "e",
        email: "ewachira254@gmail.com",
        password: "@testing254"
      };

      chai
        .request(app)
        .post("/admin/functions/create")
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equals(400);
          done();
        });
    });

    it("should not register with wrong email", done => {
      const payload = {
        username: "test",
        email: "ewachira",
        password: "@testing254"
      };

      chai
        .request(app)
        .post("/admin/functions/create")
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equals(400);
          done();
        });
    });

    it("should not register with short password", done => {
      const payload = {
        username: "test",
        email: "ewachira254@gmail.com",
        password: "tes"
      };

      chai
        .request(app)
        .post("/admin/functions/create")
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equals(400);
          done();
        });
    });

    it("should not register if admin exists", done => {
      const object = new Soul({
        username: "test",
        email: "ewachira254@gmail.com",
        password: "@testing254",
        role: "Admin",
        verification_code: 4120
      });

      const payload = {
        username: "test",
        email: "ewachira254@gmail.com",
        password: "@testing254"
      };

      object.save().then(() => {
        chai
          .request(app)
          .post("/admin/functions/create")
          .send(payload)
          .end((err, res) => {
            expect(res.status).to.equals(403);
            done();
          });
      });
    });

    it("should not register if email used", done => {
      const object = new Soul({
        username: "test",
        email: "ewachira254@gmail.com",
        password: "testing254",
        role: "User",
        verification_code: 4120
      });

      const payload = {
        username: "test",
        email: "ewachira254@gmail.com",
        password: "@testing254"
      };

      object.save().then(() => {
        chai
          .request(app)
          .post("/admin/functions/create")
          .send(payload)
          .end((err, res) => {
            expect(res.status).to.equals(403);
            done();
          });
      });
    });
  });

  describe("POST /admin/functions/access", () => {
    it("should login if account exists", done => {
      const object = new Soul({
        email: "ewachira254@gmail.com",
        username: "test",
        password: bcrypt.hashSync("@testing254", 10),
        role: "Admin",
        verification_code: 4121,
        is_verified: true
      });

      const payload = {
        email: "ewachira254@gmail.com",
        password: "@testing254"
      };

      object.save().then(() => {
        chai
          .request(app)
          .post("/admin/functions/access")
          .send(payload)
          .end((err, res) => {
            expect(res.status).to.equals(201);
            done();
          });
      });
    });

    it("should not login with wrong password", done => {
      const object = new Soul({
        email: "ewachira254@gmail.com",
        username: "test",
        password: bcrypt.hashSync("testing254", 10),
        role: "Admin",
        verification_code: 4121,
        is_verified: true
      });

      const payload = {
        email: "ewachira254@gmail.com",
        password: "@testing25"
      };

      object.save().then(() => {
        chai
          .request(app)
          .post("/admin/functions/access")
          .send(payload)
          .end((err, res) => {
            expect(res.status).to.equals(403);
            done();
          });
      });
    });

    it("should login if account is not verified/not found", done => {
      const payload = {
        email: "ewachira254@gmail.com",
        password: "@testing254"
      };

      mongoose.connection.dropDatabase();

      chai
        .request(app)
        .post("/admin/functions/access")
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equals(403);
          done();
        });
    });

    it("should not login if password is short", () => {
      const payload = {
        email: "ewachira254@gmail.com",
        password: "tes"
      };

      chai
        .request(app)
        .post("/admin/functions/access")
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equals(400);
        });
    });

    it("should not login if email is invalid", () => {
      const payload = {
        email: "ewch",
        password: "testing254"
      };

      chai
        .request(app)
        .post("/admin/functions/access")
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equals(400);
        });
    });
  });

  describe("POST /admin/functions/verify-account", () => {
    it("should verify an account", done => {
      const object = new Soul({
        username: "test",
        email: "ewachira254@gmail.com",
        password: "testing254",
        role: "Admin",
        verification_code: 4120
      });
      const payload = {
        token: jwtSignature("ewachira254@gmail.com"),
        verification_code: 4120
      };
      object.save().then(() => {
        chai
          .request(app)
          .post("/admin/functions/verify-account")
          .send(payload)
          .end((err, res) => {
            expect(res.status).to.equals(201);
            done();
          });
      });
    });

    it("should not verify account due to lack of email", done => {
      const object = new Soul({
        username: "test",
        email: "ewachira254@gmail.com",
        password: "testing254",
        role: "Admin",
        verification_code: 4120
      });

      const payload = {
        token: "adfadfadfadfadfadfafdf.afdafdafadfadfasdf.afadfadfadfaf",
        verification_code: 4120
      };

      object.save().then(() => {
        chai
          .request(app)
          .post("/admin/functions/verify-account")
          .send(payload)
          .end((err, res) => {
            expect(res.status).to.equals(400);
            done();
          });
      });
    });

    it("should not verify account due to invalid verification code", done => {
      const object = new Soul({
        username: "test",
        email: "ewachira254@gmail.com",
        password: "testing254",
        role: "Admin",
        verification_code: 4120
      });

      const payload = {
        token: jwtSignature("ewachira254@gmail.com"),
        verification_code: 4121
      };

      object.save().then(() => {
        chai
          .request(app)
          .post("/admin/functions/verify-account")
          .send(payload)
          .end((err, res) => {
            expect(res.status).to.equals(403);
            done();
          });
      });
    });

    it("should not verify account due to an unregistered email", done => {
      const object = new Soul({
        username: "test",
        email: "ewachira254@gmail.com",
        password: "testing254",
        role: "Admin",
        verification_code: 4120
      });

      const payload = {
        token: jwtSignature("json@gmail.com"),
        verification_code: 4120
      };

      object.save().then(() => {
        chai
          .request(app)
          .post("/admin/functions/verify-account")
          .send(payload)
          .end((err, res) => {
            expect(res.status).to.equals(403);
            done();
          });
      });
    });
  });

  describe("POST /admin/functions/resend-verify-email", () => {
    it("should resend verification email", done => {
      const object = new Soul({
        username: "test",
        email: "ewachira254@gmail.com",
        password: "testing254",
        is_verified: false,
        verification_code: 4130,
        role: "Admin"
      });

      object.save().then(() => {
        chai
          .request(app)
          .post("/admin/functions/resend-verify-email")
          .send({ email: "ewachira254@gmail.com" })
          .end((err, res) => {
            expect(res.status).to.equals(201);
            done();
          });
      });
    });

    it("should not resend verification email if email does not exists", done => {
      mongoose.connection.dropDatabase();
      chai
        .request(app)
        .post("/admin/functions/resend-verify-email")
        .send({ email: "ewachira254@gmail.com" })
        .end((err, res) => {
          expect(res.status).to.equals(401);
          done();
        });
    });
  });

  describe("GET /admin/functions/fetch-user/:email", () => {
    it("should fetch user by email", done => {
      const object = new Soul({
        username: "test",
        email: "ewachira254@gmail.com",
        password: "testing254",
        is_verified: true,
        role: "Admin",
        verification_code: 4120
      });

      object.save().then(() => {
        chai
          .request(app)
          .get("/admin/functions/fetch-user/ewachira254@gmail.com")
          .end((err, res) => {
            expect(res.status).to.equals(200);
            done();
          });
      });
    });

    it("should not fetch a user who does not exist", done => {
      chai
        .request(app)
        .get("/admin/functions/fetch-user/test@gmail.com")
        .end((err, res) => {
          expect(res.status).to.equals(404);
          done();
        });
    });
  });
});
