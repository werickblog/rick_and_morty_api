import mongoose from "mongoose";

const Schema = mongoose.Schema;

const objectSchema = Schema({
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
  relationships: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: false
  }
});

export default mongoose.model("Object", objectSchema);
