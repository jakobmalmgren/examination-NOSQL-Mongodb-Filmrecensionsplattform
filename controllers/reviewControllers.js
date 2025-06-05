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
    if (!req.body.movieId || !req.body.ratings || !req.body.comment) {
      return res.status(400).json({
        success: false,
        message: "movieId, ratings, comment must be included.",
      });
    }
    const reviewObj = {
      movieId: req.body.movieId,
      userId: req.id,
      ratings: req.body.ratings,
      comment: req.body.comment,
    };
    const insertedReview = await insertReviewToDb(reviewObj);
    return res.status(200).json({
      message: "review succesfully created",
      success: true,
      data: insertedReview,
    });
  } catch (error) {
    return res.status(500).json({
      message: "You failed to create the review.",
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
      message: "Reviews were fetched successfully.",
      success: true,
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "You failed to fetch the reviews.",
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
      message: "id is missing in params, URL",
      success: false,
    });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID format, not a MongoDB ObjectId.",
      success: false,
    });
  }

  try {
    const reviewsById = await findReviewInDbById(id);

    if (reviewsById === null) {
      return res.status(404).json({
        message: "The ID you provided in the URL params does not exist.",
        succes: false,
      });
    }

    return res.status(200).json({
      message: "Reviews with the specified ID were fetched successfully.",
      success: true,
      data: reviewsById,
    });
  } catch (error) {
    return res.status(500).json({
      message: "You failed to fetch reviews with the specified ID.",
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
      message: "id is missing in params, URL",
      success: false,
    });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID format, not a MongoDB ObjectId.",
      success: false,
    });
  }

  try {
    const deletedReviews = await deleteReviewInDbById(id);

    if (deletedReviews === null) {
      return res.status(404).json({
        message: "The ID you provided in the URL parameters does not exist.",
        succes: false,
      });
    }

    return res.status(200).json({
      message: "Reviews with the specified ID were deleted successfully.",
      success: true,
      deletedData: deletedReviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "You failed to delete reviews with the specified ID.",
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
      message: "Either ratings or comment must be provided for update.",
    });
  }
  if (!id) {
    return res.status(404).json({
      message: "id is missing in params, URL",
      success: false,
    });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID format, not a MongoDB ObjectId.",
      success: false,
    });
  }

  try {
    const updatedReview = await updateReviewInDbById(id, req.body);

    if (updatedReview === null) {
      return res.status(404).json({
        message: "The ID you provided in the URL parameters does not exist.",
        succes: false,
      });
    }

    return res.status(200).json({
      message: "Reviews with the specified ID were updated successfully.",
      success: true,
      updatedData: updatedReview,
    });
  } catch (error) {
    return res.status(500).json({
      message: "You failed to update reviews with the specified ID.",
      success: false,
      errorMessage: error.message,
    });
  }
};
