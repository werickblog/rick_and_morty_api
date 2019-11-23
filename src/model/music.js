import mongoose from "mongoose";

const Schema = mongoose.Schema;

const musicSchema = Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  youtube_link: {
    type: String,
    required: true
  }
});

export default mongoose.model("Music", musicSchema);
