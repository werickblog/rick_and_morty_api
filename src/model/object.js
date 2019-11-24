import mongoose from "mongoose";

const Schema = mongoose.Schema;

const objectSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    origin: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: false
    },
    bio: {
      type: String,
      required: true
    },
    relationship: {
      type: Schema.Types.ObjectId,
      ref: "Character",
      required: false
    },
    object_id: {
      type: Number,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Object", objectSchema);
