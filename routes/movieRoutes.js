import express from "express";
import {
  deleteMovieByID,
  getAllMovies,
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
// router.get("/:id/reviews");

export default router;
