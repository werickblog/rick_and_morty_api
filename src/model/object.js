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
    relationships: {
      type: Schema.Types.ObjectId,
      ref: "Character",
      required: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Object", objectSchema);
