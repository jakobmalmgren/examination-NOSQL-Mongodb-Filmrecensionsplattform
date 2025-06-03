import express from "express";
import {
  getReviews,
  postReview,
  getReviewsById,
  deleteReviewsById,
  updateReviewById,
} from "../controllers/reviewControllers.js";

const router = express.Router();

router.post("/", postReview); // kan göra populate här me här me??????
router.get("/", getReviews); // kan göra populate här me
router.get("/:id", getReviewsById); // kan göra populate här me
router.put("/:id", updateReviewById); // kan göra populate här me
router.delete("/:id", deleteReviewsById); // kan göra populate här me

export default router;
