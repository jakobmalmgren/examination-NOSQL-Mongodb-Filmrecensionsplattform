import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { checkAuthentication } from "./middlewares/checkAuthentication.js";

const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 4000;

// creating a mongodb connection and connecting it
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error.message);
    process.exit(1);
  }
};
connectDb();

// all routes

app.use("/api/movies", checkAuthentication, movieRoutes);
app.use("/api/user", userRoutes);
app.use("/api/reviews", checkAuthentication, reviewRoutes);

// trigger the server
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
