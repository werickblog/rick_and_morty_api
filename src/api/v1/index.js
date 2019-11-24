import express from "express";
import characterAPI from "./routes/characters";
import locationAPI from "./routes/locations";
import objectAPI from "./routes/objects";

const v1 = express.Router();

v1.use("/v1", characterAPI);

v1.use("/v1", locationAPI);

v1.use("/v1", objectAPI);

export default v1;
