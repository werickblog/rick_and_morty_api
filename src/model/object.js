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
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Object", objectSchema);
