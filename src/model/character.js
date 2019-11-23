import mongoose from "mongoose";

const Schema = mongoose.Schema;

const characterSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
    aka: {
      type: String,
      required: false
    },
    species: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    occupation: {
      type: Array,
      required: true
    },
    origin: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Location'
    },
    home_planet: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: false
    },
    image: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    dimension: {
        type: String,
        required: true
    },
    bio: {
        type:String,
        required: true
    },
    id: {
        type: Number,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Character", characterSchema);
