import mongoose from "mongoose";

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

export const insertReviewToDb = async (review) => {
  try {
    const insertedReview = await Review.create(review);
    return insertedReview;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReviewInDb = async () => {
  try {
    const reviews = await Review.find();
    return reviews;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findReviewInDbById = async (id) => {
  try {
    const reviews = await Review.findById(id);
    console.log("REW", reviews);

    return reviews;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteReviewInDbById = async (id) => {
  try {
    const deletedReviews = await Review.findByIdAndDelete(id);
    console.log("REW-deleted", deletedReviews);

    return deletedReviews;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateReviewInDbById = async (id, updatedData) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    console.log("REW-updated", updatedReview);

    return updatedReview;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// kolla upp de lite mer...hur de är struktuerat..
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
