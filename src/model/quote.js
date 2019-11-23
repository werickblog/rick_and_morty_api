import mongoose from "mongoose";

const Schema = mongoose.Schema;

const quoteSchema = Schema({
  quote: {
    type: String,
    required: true
  },
  by: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: false
  }
});

export default mongoose.model("Quote", quoteSchema);
