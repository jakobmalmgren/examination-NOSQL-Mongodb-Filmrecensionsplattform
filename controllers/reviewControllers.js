import {
  deleteReviewInDbById,
  findReviewInDbById,
  getReviewInDb,
  insertReviewToDb,
  updateReviewInDbById,
} from "../models/Review.js";
import mongoose from "mongoose";

//post a review
export const postReview = async (req, res) => {
  try {
    // this check is not neccesary but I do it for better API design
    if (
      !req.body.movieId ||
      !req.body.userId ||
      !req.body.ratings ||
      !req.body.comment
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Alla fält (movieId, userId, ratings, comment) måste vara med.",
      });
    }
    const insertedReview = await insertReviewToDb(req.body);
    return res.status(200).json({
      message: "review skapad succesfully",
      success: true,
      data: insertedReview,
    });
  } catch (error) {
    return res.status(500).json({
      message: "du lyckades INTE skapa review",
      success: false,
      errorMessage: error.message,
    });
  }
};

//get reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await getReviewInDb();
    return res.status(200).json({
      message: "reviews hämtades succesfully",
      success: true,
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "du lyckades INTE hämta reviews",
      success: false,
      errorMessage: error.message,
    });
  }
};

//get review by ID
export const getReviewsById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      message: "id saknas i params i URL",
      success: false,
    });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Ogiltigt ID-format, inte ett MongoDB ObjectId",
      success: false,
    });
  }

  try {
    const reviewsById = await findReviewInDbById(id);

    if (reviewsById === null) {
      return res.status(404).json({
        message: "id:t finns inte som du anger i params URL",
        succes: false,
      });
    }

    return res.status(200).json({
      message: "reviews med specifikt ID hämtades succesfully",
      success: true,
      data: reviewsById,
    });
  } catch (error) {
    return res.status(500).json({
      message: "du lyckades INTE hämta reviews med specifikt ID",
      success: false,
      errorMessage: error.message,
    });
  }
};

// delete review by ID
export const deleteReviewsById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      message: "id saknas i params i URL",
      success: false,
    });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Ogiltigt ID-format, inte ett MongoDB ObjectId",
      success: false,
    });
  }

  try {
    const deletedReviews = await deleteReviewInDbById(id);

    if (deletedReviews === null) {
      return res.status(404).json({
        message: "id:t finns inte som du anger i params URL",
        succes: false,
      });
    }

    return res.status(200).json({
      message: "reviews med specifikt ID raderades succesfully",
      success: true,
      deletedData: deletedReviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "du lyckades INTE radera reviews med specifikt ID",
      success: false,
      errorMessage: error.message,
    });
  }
};

//update review by ID
export const updateReviewById = async (req, res) => {
  const { id } = req.params;
  const { ratings, comment } = req.body;

  if (!ratings || !comment) {
    return res.status(404).json({
      message: "ratings eller comment måste finnas för uppdatering ",
    });
  }
  if (!id) {
    return res.status(404).json({
      message: "id saknas i params i URL",
      success: false,
    });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Ogiltigt ID-format, inte ett MongoDB ObjectId",
      success: false,
    });
  }

  try {
    const updatedReview = await updateReviewInDbById(id, req.body);

    if (updatedReview === null) {
      return res.status(404).json({
        message: "id:t finns inte som du anger i params URL",
        succes: false,
      });
    }

    return res.status(200).json({
      message: "reviews med specifikt ID updaterades succesfully",
      success: true,
      updatedData: updatedReview,
    });
  } catch (error) {
    return res.status(500).json({
      message: "du lyckades INTE uppdatera reviews med specifikt ID",
      success: false,
      errorMessage: error.message,
    });
  }
};
