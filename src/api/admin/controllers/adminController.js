import bcrypt from "bcrypt";
import Soul from "../../../model/soul";
import config from "../../../config";
import {
  validateEmail,
  validatePassword,
  validateName
} from "../helpers/validator";
import sendMail from "../helpers/email";
import { jwtSignature, jwtVerify } from "../helpers/jwt";

class Souls {
  constructor() {
    this.data = {};
    this.response = {};
    this.verificationCode = 0;
  }

  async fetchUserByMail(email) {
    const user = await Soul.findOne({ email }, { username: -1, email: -1 });

    if (user) {
      return {
        user: user._doc
      };
    } else {
      throw {
        message: "User account not found",
        status: 404
      };
    }
  }

  async saveAdmin(username, email, password) {
    this.validateData(username, email, password);
    const existingAdmin = await Soul.findOne({ role: "Admin" });

    if (existingAdmin) {
      throw {
        message: "Admin already exist,",
        status: 403
      };
    } else {
      await this.verificationMail(email);

      const existingUser = await Soul.findOne({ email: this.data.email });

      if (existingUser) {
        throw {
          message: "Email is in use",
          status: 400
        };
      } else {
        const encryptedPass = bcrypt.hashSync(this.data.password, 10);

        this.data.password = encryptedPass;

        this.data.verification_code = this.verificationCode;

        const newAdmin = new Soul({ ...this.data, role: "Admin" });

        await newAdmin.save();

        return {
          message: "Created account"
        };
      }
    }
  }

  async loginUser(email, password) {
    this.validateLoginData(email, password);

    const user = await Soul.findOne({ email, is_verified: true });

    if (user) {
      if (bcrypt.compareSync(this.data.password, user.password)) {
          return {
            token: jwtSignature(this.data.email),
            message: "Log in success"
          };
      } else {
        throw {
          message: "Passwords do not match",
          status: 403
        };
      }
    } else {
      throw {
        message: "User was not found or not verified",
        status: 403
      };
    }
  }

  resendMail = async email => {
    const randomNumber = Math.floor(Math.random() * 10000 + 1);

    this.verificationCode = randomNumber;

    let link = `${config.frontend_url}/email-verify/${jwtSignature(
      email
    )}?verification_code=${this.verificationCode}`;

    const exsistingSoul = await Soul.findOne({
      email,
      is_verified: false
    });

    if (exsistingSoul) {
      const data = {
        toMail: email,
        subject: "Email Verification",
        html: `<div>
                <p>
                    Just a verification procedure. Your verification code is <strong>${randomNumber}</strong>
                    <br/>
                    <br/>
            <a href="${link}">Click this link to enter their verification code </a>
            <br />
                </p>
                <br/>
                <p>
                Regards,
                <br/>
                Erick
                </p>
              </div>`
      };

      await sendMail(data);

      Object.assign(exsistingSoul, {
        verification_code: this.verificationCode
      });

      await exsistingSoul.save();

      return {
        message: "Verification sent, check email"
      };
    } else {
      throw {
        message: "Register an account",
        status: 401
      };
    }
  };

  verificationMail = async email => {
    const randomNumber = Math.floor(Math.random() * 10000 + 1);

    this.verificationCode = randomNumber;
    let link = `${config.frontend_url}/email-verify/${jwtSignature(
      email
    )}?verification_code=${this.verificationCode}`;
    const data = {
      toMail: email,
      subject: "Email Verification",
      html: `<div>
        <p>
            Just a verification procedure. Your verification code is <strong>${randomNumber}</strong>
            <br/>
            <br/>
            <a href="${link}">Click this link to enter their verification code </a>
            <br />
        </p>
        <br/>
        <p>
        Regards,
        <br/>
        Erick
        </p>
      </div>`
    };

    await sendMail(data);
  };

  async verifyAccount(token, verificationCode) {
    const decoded = jwtVerify(token);

    if (decoded.data) {
      const exsistingAdmin = await Soul.findOne({
        email: decoded.data,
        role: "Admin"
      });

      if (exsistingAdmin) {
        if (
          exsistingAdmin.verification_code === verificationCode &&
          exsistingAdmin.is_verified === false
        ) {
          Object.assign(exsistingAdmin, {
            is_verified: true
          });

          await exsistingAdmin.save();

          return {
            message: "Account verified, login"
          };
        } else {
          throw {
            message: "Invalid verification code",
            status: 403
          };
        }
      } else {
        throw {
          message: "Please register",
          status: 403
        };
      }
    } else {
      throw {
        message: "Invalid email",
        status: 400
      };
    }
  }

  validateData(username, email, password) {
    if (validateEmail(email).corect === false) {
      throw {
        message: validateEmail(email).message,
        status: 400
      };
    } else if (validatePassword(password).correct === false) {
      throw {
        message: validatePassword(password).message,
        status: 400
      };
    } else if (validateName(username).correct === false) {
      throw {
        message: validateName(username).message,
        status: 400
      };
    } else {
      this.data = {
        username,
        password,
        email
      };
    }
  }

  validateLoginData(email, password) {
    if (validateEmail(email).corect === false) {
      throw {
        message: validateEmail(email).message,
        status: 400
      };
    } else if (validatePassword(password).correct === false) {
      throw {
        message: validatePassword(password).message,
        status: 400
      };
    } else {
      this.data = {
        password,
        email
      };
    }
  }
}

export default Souls;
