import mongoose from "mongoose";

const Schema = mongoose.Schema;

const musicSchema = Schema(
  {
    title: {
      type: String,
      required: true
    },
    artist: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    youtube_link: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Music", musicSchema);
