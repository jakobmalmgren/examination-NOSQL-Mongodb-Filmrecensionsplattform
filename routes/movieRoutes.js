import express from "express";
import {
  deleteMovieByID,
  getAllMovies,
  getAllMoviesAndRatings,
  getAllReviewsFromMovie,
  getMovieByID,
  postMovie,
  updateMovieByID,
} from "../controllers/movieControllers.js";
import { checkAuthorization } from "../middlewares/checkAuthorization.js";
const router = express.Router();

//movies routes

router.post("/", checkAuthorization, postMovie);
router.get("/", getAllMovies);
// stjärnuppg-
router.get("/ratings", getAllMoviesAndRatings);
//
router.get("/:id", getMovieByID);
router.put("/:id", checkAuthorization, updateMovieByID);
router.delete("/:id", checkAuthorization, deleteMovieByID);
router.get("/:id/reviews", getAllReviewsFromMovie);

export default router;
