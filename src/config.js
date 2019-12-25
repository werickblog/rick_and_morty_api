import process from "process";
import dotenv from "dotenv";

let env = process.env.ENV;

dotenv.config();

const configuration = {
  mongo:
    process.env.NODE_ENV === "production"
    /* istanbul ignore next */
      ? process.env.PROD_DB_URL
      /* istanbul ignore next */
      : process.env.NODE_ENV === "test"
      /* istanbul ignore next */
      ? process.env.TEST_DB_URL
      : process.env.DEV_DB_URL,
  zoho_mail: process.env.ZOHO_MAIL,
  zoho_password: process.env.ZOHO_PASS,
  secret_key: process.env.SECRET_KEY,
  frontend_url: process.env.FRONTEND_URL
};

export default configuration;
