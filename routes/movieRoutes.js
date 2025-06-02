import express from "express";
import { getAllMovies, postMovie } from "../controllers/movieControllers.js";
const router = express.Router();

router.post("/", postMovie);
router.get("/", getAllMovies);
// router.get("/:id");
// router.put("/:id");
// router.get("/:id/reviews");
// router.delete("/:id");

export default router;
