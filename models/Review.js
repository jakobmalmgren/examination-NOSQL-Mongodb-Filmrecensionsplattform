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
    // varför inte göra som ja gjorde i Review

    // export const getAllReviewsFromMovieFromDb = async (id) => {
    //   try {
    //     const allReviewsFromMovie = await Review.find({ movieId: id })
    //       .populate("movieId", "title -_id")
    //       .populate("userId", "username -_id");
    //kolla!!!!!!!!!!!!!!

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

// export const aggregateAllMovieRatingsFromDb = async () => {
//   try {
//     return await Review.aggregate([
//       {
//         $group: {
//           _id: "$movieId",
//           avgRating: { $avg: "$ratings" },
//           reviewCount: { $sum: 1 },
//         },
//       },
//       {
//         $lookup: {
//           from: "movies", // inte Movies?
//           localField: "_id", // va gör de?
//           foreignField: "_id", // va gör de?
//           as: "movieData", // va gör de?
//         },
//       },
//       { $unwind: "$movieData" },
//       {
//         $project: {
//           _id: 0,
//           title: "$movieData.title",
//           genre: "$movieData.genre",
//           avgRating: { $round: ["$avgRating", 1] },
//           reviewCount: 1,
//         },
//       },
//       { $sort: { avgRating: -1 } },
//     ]);
//   } catch (error) {
//     console.log(error.message);
//     throw error;
//   }
// };

export default Review;
