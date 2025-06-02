import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, requiered: true },
  director: { type: String, requiered: true },
  releaseYear: { type: Number, requiered: true },
  genre: { type: String, requiered: true },
});

export default mongoose.model("Movie", movieSchema);
