import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
app.use(express());
dotenv.config();
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
  console.log(`servern är igång på http://localhost:${PORT}`);
});
