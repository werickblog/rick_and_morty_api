import express from "express";
import {
  fetchCharacters,
  fetchSingleCharacterController
} from "../controllers/characters";

const api = express.Router();

api.get("/characters", fetchCharacters);

api.get("/characters/:character_id", fetchSingleCharacterController);

export default api;
