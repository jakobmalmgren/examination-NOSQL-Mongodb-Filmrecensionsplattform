import express from "express";
import { createUser, logInUser } from "../controllers/userControllers.js";

const router = express.Router();

//user routes

router.post("/register", createUser);

router.post("/login", logInUser);

export default router;
