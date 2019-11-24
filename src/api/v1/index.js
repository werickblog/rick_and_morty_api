import express from "express";
import characterAPI from "./routes/characters";
import locationAPI from "./routes/locations";
import objectAPI from "./routes/objects";
import quoteAPI from "./routes/quotes";

const v1 = express.Router();

const v1Route = "/v1";

v1.use(v1Route, characterAPI);

v1.use(v1Route, locationAPI);

v1.use(v1Route, objectAPI);

v1.use(v1Route, quoteAPI);

export default v1;
