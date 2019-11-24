import mongoose from "mongoose";

const Schema = mongoose.Schema;

const locationSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    dimension: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    location_id: {
      type: Number,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Location", locationSchema);
