import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 4000;

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("ansluten till mongoDB");
  } catch (error) {
    console.log("gick inte ansluta till mongoDB", error.message);
    process.exit(1);
  }
};

connectDb();

app.use("/api/movies", movieRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`servern är igång på http://localhost:${PORT}`);
});
