import express from "express";
import characterAPI from "./routes/characters";

const v1 = express.Router();

v1.use("/v1", characterAPI);

export default v1;
