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

export const aggregateAllMovieRatingsFromDb = async () => {
  try {
    return await Movie.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id", // varje filmens _id
          foreignField: "movieId", // matcha mot reviews.movieId
          as: "reviews",
        },
      },
      {
        $addFields: {
          avgRating: { $avg: "$reviews.ratings" },
          reviewCount: { $size: "$reviews" },
        },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          genre: 1,
          avgRating: { $round: ["$avgRating", 1] },
          reviewCount: 1,
        },
      },
      { $sort: { avgRating: -1 } },
    ]);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default Movie;
