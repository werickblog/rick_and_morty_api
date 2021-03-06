"use strict";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import logs from "morgan";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import MongoStore from "rate-limit-mongo";

import config from "./config";

import v1 from "./api/v1";
import admin from "./api/admin";

const app = express();

// API rate limit initialization

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: {
    message:
      "Exceeded your allocated API calls, 1000 requests a day",
    api_calls_limit: 1000,
    api_calls_renewal_time: "1 day"
  },
  statusCode: 429,
  store: new MongoStore({
    uri: config.mongo,
    expireTimeMs: 864000000,
    collectionName: "rateLimits"
  })
});

app.use("/api", apiLimiter);

// Configure Dotenv to read environment variables from .env file
// automatically
dotenv.config();

// Define json body reader
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logger
app.use(logs("dev"));

app.use(express.static(__dirname, { dotfiles: "allow" }));

// Enable proxy x-Forwadded-*
app.enable("trust proxy");

// Enables CORS
app.use(cors());

// Mongoose stuff
// Connect to database
mongoose.connect(config.mongo, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("open", err => {
  /* istanbul ignore next */
  if (err) console.log(chalk.red("Error connecting to database"));
  console.log(
    chalk.green(`Connected to database successfully ${config.mongo}`)
  );
});

// Set port
app.set("port", process.env.PORT || 5000);

// Endpoints
app.use("/api", v1); // v1 API endpoints
app.use("/admin", admin);

// Initialize server
const server = app.listen(app.get("port"), err => {
  /* istanbul ignore next */
  if (err) {
    console.log(chalk.red(err.message));
  } else {
    console.log(chalk.green(`Server is running on port ${app.get("port")}`));
  }
});

export const stop = () => {
  server.close();
};

export default server;
