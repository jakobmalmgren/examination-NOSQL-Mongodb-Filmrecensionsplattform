import {
  aggregateAllMovieRatingsFromDb,
  deleteMovieByIdFromDb,
  getAllMoviesFromDb,
  getMovieByIdFromDb,
  insertMovieDb,
  updateMovieByIdFromDb,
} from "../models/Movie.js";
import mongoose from "mongoose";
import { getAllReviewsFromMovieFromDb } from "../models/Review.js";

// create a movie

export const postMovie = async (req, res) => {
  // const movieData = req.body;
  const { title, director, releaseYear, genre } = req.body;

  if (!title || !director || !releaseYear || !genre) {
    return res.status(400).json({
      message:
        "your body need to include title, director,releaseYear and genre",
      success: false,
    });
  }
  const movieData = {
    title,
    director,
    releaseYear,
    genre,
  };

  try {
    const insertMovie = await insertMovieDb(movieData);
    return res.status(201).json({
      message: "You successfully added a new movie.",
      success: true,
      data: insertMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "You failed to add a new movie.",
      success: false,
      errorMessage: error.message,
    });
  }
};

//get all movies

export const getAllMovies = async (req, res) => {
  try {
    const allMovies = await getAllMoviesFromDb();
    return res.status(200).json({
      message: "You successfully retrieved all movies",
      success: true,
      data: allMovies,
    });
  } catch (error) {
    return res.status(500).json({
      message: "You failed to retrieve all movies.",
      success: false,
      errorMessage: error.message,
    });
  }
};

//get a movie by its ID
export const getMovieByID = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID in URL params is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID format, not a MongoDB ObjectId.",
      success: false,
    });
  }

  try {
    const movie = await getMovieByIdFromDb(id);
    if (movie === null) {
      return res.status(404).json({
        message: "the ID doesnt excist",
      });
    }
    return res.status(200).json({
      message: "You successfully retrieved the movie with the specified ID.",
      success: true,
      data: movie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "You failed to retrieve the movie with the specified ID.",
      success: false,
      errorMessage: error.message,
    });
  }
};

//update a movie by its ID
export const updateMovieByID = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID in URL params is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID format, not a MongoDB ObjectId.",
      success: false,
    });
  }
  const { title, director, releaseYear, genre } = req.body;

  if (!title || !director || !releaseYear || !genre) {
    return res.status(404).json({
      message:
        "title, director, releaseYear and genre have to be included in the body",
      success: false,
    });
  }

  try {
    const updatedMovie = await updateMovieByIdFromDb(id, req.body);
    if (updatedMovie === null) {
      return res.status(404).json({
        message: "ID:t finns inte",
      });
    }
    return res.status(200).json({
      message: "You successfully updated the movie with the specified ID.",
      success: true,
      data: updatedMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "You failed to update the movie with the specified ID.",
      success: false,
      errorMessage: error.message,
    });
  }
};

// delete av movie by its ID
export const deleteMovieByID = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID in URL params is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID format, not a MongoDB ObjectId.",
      success: false,
    });
  }

  try {
    const deletedMovie = await deleteMovieByIdFromDb(id);
    if (deletedMovie === null) {
      return res.status(404).json({
        message: "the ID doesnt excist",
      });
    }

    return res.status(200).json({
      message: "You successfully deleted the movie with the specified ID.",
      success: true,
      deletedData: deletedMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "You failed to delete the movie with the specified ID.",
      success: false,
      errorMessage: error.message,
    });
  }
};

// get all reviews from a movie
export const getAllReviewsFromMovie = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID in URL params is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID format, not a MongoDB ObjectId.",
      success: false,
    });
  }

  try {
    const allReviewsFromMovie = await getAllReviewsFromMovieFromDb(id);

    if (allReviewsFromMovie.length === 0) {
      return res.status(404).json({
        message: "The ID does not exist or the movie has no reviews.",
      });
    }

    return res.status(200).json({
      message: "Fetching reviews for the specified movie was successful.",
      success: true,
      Data: allReviewsFromMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Fetching reviews for the specified movie failed.",
      success: false,
      errorMessage: error.message,
    });
  }
};
//get all movies & ratings
export const getAllMoviesAndRatings = async (req, res) => {
  try {
    const aggregatedData = await aggregateAllMovieRatingsFromDb();

    if (aggregatedData.length === 0) {
      return res.status(404).json({
        message: "There are no reviews available!",
      });
    }

    return res.status(200).json({
      message: "Fetching all movies and their average ratings was successful!",
      success: true,
      Data: aggregatedData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Fetching all movies and their average ratings failed.",
      success: false,
      errorMessage: error.message,
    });
  }
};
