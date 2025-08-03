import mongoose, { mongo } from "mongoose";

// create a schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// model based off schema

const Note = mongoose.model('Note', noteSchema);

export default Note;
