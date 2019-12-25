import express from "express";
import {
  addCharacter,
  addLocation,
  addQuote,
  addObject,
  updateCharacter,
  updateLocation,
  updateQuote,
  updateObject,
  deleteCharacter,
  deleteLocation,
  deleteObject,
  deleteQuote,
  fetchCharacters,
  fetchSingleCharacter,
  fetchLocations,
  fetchSingleLocation,
  fetchSingleObject,
  fetchObjects,
  fetchQuotes,
  fetchSingleQuote
} from "../controllers";
import routeProtector from "../helpers/routeProtector";

const api = express.Router();

api.post("/add-character", routeProtector, addCharacter);

api.post("/add-location", routeProtector, addLocation);

api.post("/add-quote", routeProtector, addQuote);

api.post("/add-object", routeProtector, addObject);

api.put("/update-character/:character_id", routeProtector, updateCharacter);

api.put("/update-location/:location_id", routeProtector, updateLocation);

api.put("/update-quote/:quote_id", routeProtector, updateQuote);

api.put("/update-object/:object_id", routeProtector, updateObject);

api.delete("/delete-character/:character_id", routeProtector, deleteCharacter);

api.delete("/delete-location/:location_id", routeProtector, deleteLocation);

api.delete("/delete-object/:object_id", routeProtector, deleteObject);

api.delete("/delete-quote/:quote_id", routeProtector, deleteQuote);

api.get("/fetch-characters", routeProtector, fetchCharacters);

api.get(
  "/fetch-characters/:character_id",
  routeProtector,
  fetchSingleCharacter
);

api.get("/fetch-locations", routeProtector, fetchLocations);

api.get("/fetch-locations/:location_id", routeProtector, fetchSingleLocation);

api.get("/fetch-objects/:object_id", routeProtector, fetchSingleObject);

api.get("/fetch-objects", routeProtector, fetchObjects);

api.get("/fetch-quotes", routeProtector, fetchQuotes);

api.get("/fetch-quotes/:quote_id", routeProtector, fetchSingleQuote);

export default api;
