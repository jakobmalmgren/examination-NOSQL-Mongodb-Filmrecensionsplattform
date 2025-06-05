import mongoose from "mongoose";

//Review model that includes the scheme and functions connected to it

const reviewSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ratings: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, maxlength: 500, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

// insert review func

export const insertReviewToDb = async (review) => {
  try {
    const insertedReview = await Review.create(review);
    const populatedReview = await Review.findById(insertedReview._id)
      .select("-_id -__v")
      .populate("movieId", "-__v -_id")
      .populate("userId", "-_id -password -__v");

    return populatedReview;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get review func
export const getReviewInDb = async () => {
  try {
    const reviews = await Review.find();
    return reviews;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//find review by id func
export const findReviewInDbById = async (id) => {
  try {
    const reviews = await Review.findById(id)
      .select("-_id -__v")
      .populate("movieId", "-__v -_id")
      .populate("userId", "-_id -password -__v");
    console.log("REW", reviews);

    return reviews;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//delete review by id func
export const deleteReviewInDbById = async (id) => {
  try {
    const deletedReviews = await Review.findByIdAndDelete(id)
      .select("-_id -__v")
      .populate("movieId", "-__v -_id")
      .populate("userId", "-_id -password -__v");
    console.log("REW-deleted", deletedReviews);

    return deletedReviews;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//update review by id func
export const updateReviewInDbById = async (id, updatedData) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    })
      .select("-_id -__v")
      .populate("movieId", "-__v -_id")
      .populate("userId", "-_id -password -__v");
    console.log("REW-updated", updatedReview);

    return updatedReview;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//get all reviews func
export const getAllReviewsFromMovieFromDb = async (id) => {
  try {
    const allReviewsFromMovie = await Review.find({ movieId: id })
      .populate("movieId", "title -_id")
      .populate("userId", "username -_id");

    console.log("allReviewsFromMovie", allReviewsFromMovie);

    return allReviewsFromMovie;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export default Review;
