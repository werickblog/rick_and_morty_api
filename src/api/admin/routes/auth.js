import express from "express";
import {
  createAdminAccount,
  loginUser,
  verifyAccount,
  resendMail,
  fetchUserByMail
} from "../controllers";

const api = express.Router()

api.post("/create", createAdminAccount)

api.post("/access", loginUser)

api.post("/verify-account", verifyAccount)

api.post("/resend-verify-email", resendMail)

api.get("/fetch-user/:email", fetchUserByMail)

export default api