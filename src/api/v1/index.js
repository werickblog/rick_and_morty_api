import express from "express";
import characterAPI from "./routes/characters";
import locationAPI from "./routes/locations";

const v1 = express.Router();

v1.use("/v1", characterAPI);

v1.use("/v1", locationAPI);

export default v1;
