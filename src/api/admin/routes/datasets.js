import express from "express";
import { addCharacter, addLocation, addQuote, addObject } from "../controllers";
import routeProtector from "../helpers/routeProtector";

const api = express.Router();

api.post("/add-character", routeProtector, addCharacter);

api.post("/add-location", routeProtector, addLocation);

api.post("/add-quote", routeProtector, addQuote);

api.post("/add-object", routeProtector, addObject);

export default api;
