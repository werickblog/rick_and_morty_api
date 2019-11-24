import express from "express";
import {
  fetchQuotesController,
  fetchSingleQuoteController
} from "../controllers/quotes";

const api = express.Router();

api.get("/quotes", fetchQuotesController);

api.get("/quotes/:quote_id", fetchSingleQuoteController);

export default api;
