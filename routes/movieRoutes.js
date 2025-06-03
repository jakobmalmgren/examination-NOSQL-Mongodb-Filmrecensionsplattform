import express from "express";
import {
  deleteMovieByID,
  getAllMovies,
  getAllReviewsFromMovie,
  getMovieByID,
  postMovie,
  updateMovieByID,
} from "../controllers/movieControllers.js";
const router = express.Router();

router.post("/", postMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovieByID);
router.put("/:id", updateMovieByID);
router.delete("/:id", deleteMovieByID);
router.get("/:id/reviews", getAllReviewsFromMovie);

export default router;
