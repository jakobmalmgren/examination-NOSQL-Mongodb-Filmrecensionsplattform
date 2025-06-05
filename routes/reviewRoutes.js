import express from "express";
import {
  getReviews,
  postReview,
  getReviewsById,
  deleteReviewsById,
  updateReviewById,
} from "../controllers/reviewControllers.js";
import { checkAuthorization } from "../middlewares/checkAuthorization.js";

const router = express.Router();

//reviews routes

router.post("/", postReview);
router.get("/", getReviews);
router.get("/:id", getReviewsById);
router.put("/:id", checkAuthorization, updateReviewById);
router.delete("/:id", checkAuthorization, deleteReviewsById);

export default router;
