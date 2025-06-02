import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      requiered: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requiered: true,
    },
    ratings: { type: Number, min: 1, max: 5, requiered: true },
    comment: { type: String, maxlength: 500, requiered: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
