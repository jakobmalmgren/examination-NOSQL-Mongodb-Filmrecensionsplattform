import {
  deleteMovieByIdFromDb,
  getAllMoviesFromDb,
  getMovieByIdFromDb,
  insertMovieDb,
  updateMovieByIdFromDb,
} from "../models/Movie.js";

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

export const getMovieByID = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID i URL params är required",
    });
  }

  try {
    const movie = await getMovieByIdFromDb(id);
    if (movie === null) {
      return res.status(404).json({
        message: "ID:t finns inte",
      });
    }
    return res.status(200).json({
      message: "du lyckades hämta filmen med specifikt ID",
      success: true,
      data: movie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "du lyckades INTE hämta filmen med specifikt ID",
      success: false,
      errorMessage: error.message,
    });
  }
};

export const updateMovieByID = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID i URL params är required",
    });
  }

  const updatedData = req.body;
  try {
    const updatedMovie = await updateMovieByIdFromDb(id, updatedData);
    if (updatedMovie === null) {
      return res.status(404).json({
        message: "ID:t finns inte",
      });
    }
    return res.status(200).json({
      message: "du lyckades uppdatera filmen med specifikt ID",
      success: true,
      data: updatedMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "du lyckades INTE uppdatera filmen med specifikt ID",
      success: false,
      errorMessage: error.message,
    });
  }
};

export const deleteMovieByID = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID i URL params är required",
    });
  }

  try {
    const deletedMovie = await deleteMovieByIdFromDb(id);
    if (deletedMovie === null) {
      return res.status(404).json({
        message: "ID:t finns inte",
      });
    }

    return res.status(200).json({
      message: "du lyckades deleta filmen med specifikt ID",
      success: true,
      deletedData: deletedMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "du lyckades INTE deleta filmen med specifikt ID",
      success: false,
      errorMessage: error.message,
    });
  }
};
