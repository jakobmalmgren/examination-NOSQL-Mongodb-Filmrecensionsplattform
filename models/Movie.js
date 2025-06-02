import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  genre: { type: String, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);

export const insertMovieDb = async (movieData) => {
  try {
    const createdMovie = await Movie.create(movieData);
    return createdMovie;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
export const getAllMoviesFromDb = async () => {
  try {
    const allMovies = Movie.find({});
    return allMovies;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getMovieByIdFromDb = async (id) => {
  try {
    const movie = Movie.findById(id);
    return movie;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const updateMovieByIdFromDb = async (id, updatedData) => {
  try {
    const updatedMovie = Movie.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    return updatedMovie;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const deleteMovieByIdFromDb = async (id) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    console.log("DELETE", deletedMovie);

    return deletedMovie;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export default Movie;
