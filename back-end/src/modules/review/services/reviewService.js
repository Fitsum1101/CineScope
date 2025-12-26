// reviewService code

const { prisma } = require("../../../config/db");

/**
 * CREATE REVIEW
 */
const createReview = async (data) => {
  return await prisma.review.create({
    data,
  });
};

/**
 * GET ALL REVIEWS (with optional pagination & filters)
 */
const getReviews = async (filters = {}) => {
  const {
    page = 1,
    limit = 10,
    pagination = true,
    movieId,
    userId,
    isApproved,
    isFlagged,
  } = filters;

  const take = Number(limit);
  const currentPage = Math.max(1, Number(page));
  const skip = (currentPage - 1) * take;

  // Base where clause
  const where = {
    ...(movieId && { movieId }),
    ...(userId && { userId }),
    ...(typeof isApproved === "boolean" && { isApproved }),
    ...(typeof isFlagged === "boolean" && { isFlagged }),
  };

  const totalReviews = await prisma.review.count({ where });

  let paginationInfo = {};

  if (pagination) {
    const totalPage = Math.ceil(totalReviews / take);

    paginationInfo = {
      currentPage: Math.min(currentPage, totalPage),
      prevPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: currentPage < totalPage ? currentPage + 1 : null,
      endPage: totalPage,
      totalItems: totalReviews,
    };
  }

  const reviews = await prisma.review.findMany({
    where,
    ...(pagination && { skip, take }),
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      movie: true,
    },
  });

  return {
    reviews,
    ...(pagination ? paginationInfo : {}),
  };
};

/**
 * GET REVIEW BY ID
 */
const getReviewById = async (id) => {
  return await prisma.review.findUnique({
    where: { id },
    include: {
      user: true,
      movie: true,
      flagged: true,
    },
  });
};

const getReviewsByMovieId = async (movieId, filters = {}) => {
  const { page = 1, limit = 10, pagination = true } = filters;

  const take = Number(limit);
  const currentPage = Math.max(1, Number(page));
  const skip = (currentPage - 1) * take;

  const totalReviews = await prisma.review.count({
    where: { movieId },
  });

  let paginationInfo = {};

  if (pagination) {
    const totalPage = Math.ceil(totalReviews / take);

    paginationInfo = {
      currentPage: Math.min(currentPage, totalPage),
      prevPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: currentPage < totalPage ? currentPage + 1 : null,
      endPage: totalPage,
      totalItems: totalReviews,
    };
  }

  const reviews = await prisma.review.findMany({
    where: { movieId },
    ...(pagination && { skip, take }),
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      movie: true,
    },
  });

  return {
    reviews,
    ...(pagination ? paginationInfo : {}),
  };
};

/**
 * UPDATE REVIEW
 */
const updateReview = async (id, data) => {
  return await prisma.review.update({
    where: { id },
    data,
  });
};

/**
 * DELETE REVIEW
 */
const deleteReview = async (id) => {
  return await prisma.review.delete({
    where: { id },
  });
};

/**
 * APPROVE / DISAPPROVE REVIEW
 */
const approveReview = async (id, isApproved) => {
  return await prisma.review.update({
    where: { id },
    data: { isApproved },
  });
};

/**
 * FLAG REVIEW
 */
const flagReview = async (id) => {
  return await prisma.review.update({
    where: { id },
    data: { isFlagged: true },
  });
};

module.exports = {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
  approveReview,
  flagReview,
  getReviewsByMovieId,
};
