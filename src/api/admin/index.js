import express from "express";
import authAPI from "./routes/auth";
import datasetAPI from "./routes/datasets";

const admin = express.Router();

const adminRouter = "/functions";

admin.use(adminRouter, authAPI);

admin.use(adminRouter, datasetAPI);

export default admin;
