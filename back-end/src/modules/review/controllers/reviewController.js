// reviewController code

const reviewService = require("../services/reviewService");
const ApiResponse = require("../../../utils/apiResponse");
const catchAsync = require("../../../utils/catchAsync");
const ApiError = require("../../../utils/apiError");
const { StatusCodes } = require("http-status-codes");

const createReview = catchAsync(async (req, res) => {
  const reviewData = req.body;
  reviewData.userId = req.user.id; // Assuming user ID is available in req.user

  const newReview = await reviewService.createReview(reviewData);

  return res
    .status(StatusCodes.CREATED)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        newReview,
        "Review created successfully"
      )
    );
});

const getReviewsByMovieId = catchAsync(async (req, res) => {
  const { movieId } = req.params;
  const { page, limit } = req.query;

  const reviewsData = await reviewService.getReviewsByMovieId(
    movieId,
    page,
    limit
  );

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        reviewsData,
        "Reviews for the movie retrieved successfully"
      )
    );
});

const approveReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const isApproved = req.query.isApproved;

  const approvedReview = await reviewService.approveReview(
    reviewId,
    isApproved
  );

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        approvedReview,
        "Review approved successfully"
      )
    );
});

module.exports = {
  createReview,
  getReviewsByMovieId,
  approveReview,
};
