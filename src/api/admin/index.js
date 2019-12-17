import express from "express";
import authAPI from "./routes/auth";

const admin = express.Router();

const adminRouter = "/functions";

admin.use(adminRouter, authAPI);

export default admin;
