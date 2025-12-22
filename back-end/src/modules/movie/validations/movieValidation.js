// movieValidation code
const Joi = require("joi");

// Custom validation messages
const validationMessages = {
  required: "is required",
  invalid: "Valid",
  number: "must be a number",
  integer: "must be an integer",
  positive: "must be positive",
  string: "must be a string",
  boolean: "must be boolean",
  max: "exceeds maximum allowed",
  min: "is below minimum allowed",
  length: "must be",
};

// Common parameter schemas
const movieIdParam = {
  params: Joi.object()
    .keys({
      id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
          "any.required": `Movie ID ${validationMessages.required}`,
          "number.base": `Movie ID ${validationMessages.number}`,
          "number.integer": `Movie ID ${validationMessages.integer}`,
          "number.positive": `Movie ID ${validationMessages.positive}`,
        }),
    })
    .required(),
};

const genreIdParam = {
  params: Joi.object()
    .keys({
      genreId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
          "any.required": `Genre ID ${validationMessages.required}`,
          "number.base": `Genre ID ${validationMessages.number}`,
          "number.integer": `Genre ID ${validationMessages.integer}`,
          "number.positive": `Genre ID ${validationMessages.positive}`,
        }),
    })
    .required(),
};

// Query parameter schemas
const getMovies = {
  query: Joi.object()
    .keys({
      page: Joi.number()
        .integer()
        .min(1)
        .max(500)
        .optional()
        .default(1)
        .messages({
          "number.base": `Page ${validationMessages.number}`,
          "number.integer": `Page ${validationMessages.integer}`,
          "number.min": `Page ${validationMessages.min}`,
          "number.max": `Page ${validationMessages.max}`,
        }),
      region: Joi.string()
        .length(2)
        .uppercase()
        .optional()
        .default("US")
        .messages({
          "string.base": `Region ${validationMessages.string}`,
          "string.length": `Region ${validationMessages.length} 2 characters`,
        }),
    })
    .optional(),
};

const searchMovies = {
  query: Joi.object()
    .keys({
      query: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
          "any.required": `Search query ${validationMessages.required}`,
          "string.base": `Search query ${validationMessages.string}`,
          "string.empty": `Search query ${validationMessages.required}`,
          "string.min": `Search query ${validationMessages.min} 1 character`,
          "string.max": `Search query ${validationMessages.max} 100 characters`,
        }),
      page: Joi.number()
        .integer()
        .min(1)
        .max(500)
        .optional()
        .default(1)
        .messages({
          "number.base": `Page ${validationMessages.number}`,
          "number.integer": `Page ${validationMessages.integer}`,
          "number.min": `Page ${validationMessages.min}`,
          "number.max": `Page ${validationMessages.max}`,
        }),
      includeAdult: Joi.boolean()
        .optional()
        .default(false)
        .messages({
          "boolean.base": `Include adult ${validationMessages.boolean}`,
        }),
    })
    .required(),
};

const discoverMovies = {
  query: Joi.object()
    .keys({
      page: Joi.number()
        .integer()
        .min(1)
        .max(500)
        .optional()
        .default(1)
        .messages({
          "number.base": `Page ${validationMessages.number}`,
          "number.integer": `Page ${validationMessages.integer}`,
          "number.min": `Page ${validationMessages.min}`,
          "number.max": `Page ${validationMessages.max}`,
        }),
      sort_by: Joi.string()
        .valid(
          "popularity.asc",
          "popularity.desc",
          "release_date.asc",
          "release_date.desc",
          "revenue.asc",
          "revenue.desc",
          "primary_release_date.asc",
          "primary_release_date.desc",
          "original_title.asc",
          "original_title.desc",
          "vote_average.asc",
          "vote_average.desc",
          "vote_count.asc",
          "vote_count.desc"
        )
        .optional()
        .messages({
          "string.base": `Sort by ${validationMessages.string}`,
          "any.only": "Invalid sort parameter",
        }),
      with_genres: Joi.string()
        .pattern(/^\d+(,\d+)*$/)
        .optional()
        .messages({
          "string.pattern.base": "Genres must be comma-separated numbers",
        }),
      year: Joi.number()
        .integer()
        .min(1900)
        .max(2100)
        .optional()
        .messages({
          "number.base": `Year ${validationMessages.number}`,
          "number.integer": `Year ${validationMessages.integer}`,
          "number.min": `Year ${validationMessages.min} 1900`,
          "number.max": `Year ${validationMessages.max} 2100`,
        }),
      "vote_average.gte": Joi.number()
        .min(0)
        .max(10)
        .optional()
        .messages({
          "number.base": `Minimum vote average ${validationMessages.number}`,
          "number.min": `Minimum vote average ${validationMessages.min} 0`,
          "number.max": `Minimum vote average ${validationMessages.max} 10`,
        }),
      "vote_average.lte": Joi.number()
        .min(0)
        .max(10)
        .optional()
        .messages({
          "number.base": `Maximum vote average ${validationMessages.number}`,
          "number.min": `Maximum vote average ${validationMessages.min} 0`,
          "number.max": `Maximum vote average ${validationMessages.max} 10`,
        }),
      with_runtime: Joi.string()
        .pattern(/^\d+-\d+$/)
        .optional()
        .messages({
          "string.pattern.base": "Runtime must be in format: min-max",
        }),
      with_original_language: Joi.string()
        .length(2)
        .optional()
        .messages({
          "string.length": `Original language ${validationMessages.length} 2 characters`,
        }),
      "vote_count.gte": Joi.number()
        .integer()
        .min(0)
        .optional()
        .messages({
          "number.base": `Minimum vote count ${validationMessages.number}`,
          "number.integer": `Minimum vote count ${validationMessages.integer}`,
          "number.min": `Minimum vote count ${validationMessages.min} 0`,
        }),
      with_keywords: Joi.string()
        .pattern(/^\d+(,\d+)*$/)
        .optional()
        .messages({
          "string.pattern.base": "Keywords must be comma-separated numbers",
        }),
      with_companies: Joi.string()
        .pattern(/^\d+(,\d+)*$/)
        .optional()
        .messages({
          "string.pattern.base": "Companies must be comma-separated numbers",
        }),
    })
    .optional(),
};

const getMovieDetails = {
  query: Joi.object()
    .keys({
      appendToResponse: Joi.alternatives()
        .try(
          Joi.string().pattern(/^[\w,]+$/),
          Joi.array().items(
            Joi.string().valid(
              "credits",
              "videos",
              "images",
              "similar",
              "recommendations",
              "reviews"
            )
          )
        )
        .optional()
        .messages({
          "string.pattern.base":
            "Append parameters must be comma-separated words",
          "any.only": "Invalid append parameter",
        }),
    })
    .optional(),
};

const getMovieReviews = {
  query: Joi.object()
    .keys({
      page: Joi.number()
        .integer()
        .min(1)
        .max(500)
        .optional()
        .default(1)
        .messages({
          "number.base": `Page ${validationMessages.number}`,
          "number.integer": `Page ${validationMessages.integer}`,
          "number.min": `Page ${validationMessages.min}`,
          "number.max": `Page ${validationMessages.max}`,
        }),
    })
    .optional(),
};

const getRelatedMovies = {
  query: Joi.object()
    .keys({
      page: Joi.number()
        .integer()
        .min(1)
        .max(500)
        .optional()
        .default(1)
        .messages({
          "number.base": `Page ${validationMessages.number}`,
          "number.integer": `Page ${validationMessages.integer}`,
          "number.min": `Page ${validationMessages.min}`,
          "number.max": `Page ${validationMessages.max}`,
        }),
    })
    .optional(),
};

const getMovieImages = {
  query: Joi.object()
    .keys({
      includeImageLanguage: Joi.string()
        .pattern(/^[a-zA-Z,]+$/)
        .optional()
        .messages({
          "string.pattern.base":
            "Language codes must be comma-separated letters",
        }),
    })
    .optional(),
};

const getTrendingMovies = {
  query: Joi.object()
    .keys({
      timeWindow: Joi.string()
        .valid("day", "week")
        .optional()
        .default("week")
        .messages({
          "string.base": `Time window ${validationMessages.string}`,
          "any.only": "Time window must be 'day' or 'week'",
        }),
      page: Joi.number()
        .integer()
        .min(1)
        .max(500)
        .optional()
        .default(1)
        .messages({
          "number.base": `Page ${validationMessages.number}`,
          "number.integer": `Page ${validationMessages.integer}`,
          "number.min": `Page ${validationMessages.min}`,
          "number.max": `Page ${validationMessages.max}`,
        }),
    })
    .optional(),
};

const getMoviesByGenre = {
  query: Joi.object()
    .keys({
      page: Joi.number()
        .integer()
        .min(1)
        .max(500)
        .optional()
        .default(1)
        .messages({
          "number.base": `Page ${validationMessages.number}`,
          "number.integer": `Page ${validationMessages.integer}`,
          "number.min": `Page ${validationMessages.min}`,
          "number.max": `Page ${validationMessages.max}`,
        }),
    })
    .optional(),
};

const getMultipleMovies = {
  query: Joi.object()
    .keys({
      ids: Joi.string()
        .pattern(/^\d+(,\d+)*$/)
        .required()
        .messages({
          "any.required": `Movie IDs ${validationMessages.required}`,
          "string.pattern.base": "Movie IDs must be comma-separated numbers",
          "string.empty": `Movie IDs ${validationMessages.required}`,
        }),
    })
    .required(),
};

module.exports = {
  movieIdParam,
  genreIdParam,
  getMovies,
  searchMovies,
  discoverMovies,
  getMovieDetails,
  getMovieReviews,
  getRelatedMovies,
  getMovieImages,
  getTrendingMovies,
  getMoviesByGenre,
  getMultipleMovies,
};
