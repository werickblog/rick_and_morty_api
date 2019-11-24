import express from "express";
import {
  fetchObjectsController,
  fetchSingleObjectController
} from "../controllers/objects";

const api = express.Router();

api.get("/objects", fetchObjectsController);

api.get("/objects/:object_id", fetchSingleObjectController);

export default api;
