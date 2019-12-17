import mongoose from "mongoose";

const Schema = mongoose.Schema;

const soulSchema = Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verification_code: {
    type: Number,
    required: true
  },
  is_verified: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Soul", soulSchema);
