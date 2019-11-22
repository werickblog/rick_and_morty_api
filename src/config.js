import process from "process";
import dotenv from "dotenv";

let env = process.env.ENV;

dotenv.config();

const configuration = {
  mongo:
    process.env.NODE_ENV === "production"
      ? process.env.PROD_DB_URL
      : process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_URL
      : process.env.DEV_DB_URL
};

export default configuration;
