import { getAllMoviesFromDb, insertMovieDb } from "../models/Movie.js";

export const postMovie = async (req, res) => {
  const movieData = req.body;

  try {
    const insertMovie = await insertMovieDb(movieData);
    return res.status(201).json({
      message: "du lyckades lägga till en ny film",
      success: true,
      data: insertMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "du lyckades INTE lägga till en ny film",
      success: false,
      errorMessage: error.message,
    });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const allMovies = await getAllMoviesFromDb();
    return res.status(200).json({
      message: "du lyckades hämta alla filmer",
      success: true,
      data: allMovies,
    });
  } catch (error) {
    return res.status(500).json({
      message: "du lyckades INTE hämta alla filmer",
      success: false,
      errorMessage: error.message,
    });
  }
};
