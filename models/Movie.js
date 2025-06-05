import mongoose from "mongoose";

//Movie model that includes the scheme and functions connected to it

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  genre: { type: String, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);

// insert movie func

export const insertMovieDb = async (movieData) => {
  try {
    const createdMovie = await Movie.create(movieData);
    return createdMovie;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

//get all movies func
export const getAllMoviesFromDb = async () => {
  try {
    const allMovies = Movie.find({});
    return allMovies;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

// get movie by id func
export const getMovieByIdFromDb = async (id) => {
  try {
    const movie = Movie.findById(id);
    return movie;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

//update movie by id func
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

//delete movie by id func
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

// aggregate all movie ratings func
export const aggregateAllMovieRatingsFromDb = async () => {
  try {
    return await Movie.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "movieId",
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
