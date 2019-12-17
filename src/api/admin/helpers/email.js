import nodemailer from "nodemailer";
import config from "../../../config";
import { jwtSignature } from "./jwt";

let transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: config.zoho_mail,
    pass: config.zoho_password
  }
});

const sendMail = data => {
  let link = `${config.frontend_url}/email-verify/${jwtSignature(data.toMail)}`;

  let mailOptions = {
    from: config.zoho_mail,
    to: data.toMail,
    subject: data.subject,
    html: data.html
  };

  transporter.sendMail(mailOptions, error => {
    /* istanbul ignore next */
    if (error) {
      /* istanbul ignore next */
      console.log(error.message);
    } else {
      console.log("Email sent");
      transporter.close();
    }
  });
};

export default sendMail;
