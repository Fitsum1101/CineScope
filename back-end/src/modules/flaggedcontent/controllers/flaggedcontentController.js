// flaggedcontentController code

const flaggedcontentService = require("../services/flaggedcontentService");
const ApiResponse = require("../../../utils/apiResponse");
const catchAsync = require("../../../utils/catchAsync");
const ApiError = require("../../../utils/apiError");
const { StatusCodes } = require("http-status-codes");

const getAllFlaggedContents = catchAsync(async (req, res) => {
  const flaggedContents = await flaggedcontentService.getFlaggedContent(
    req.query
  );

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        flaggedContents,
        "Flagged contents retrieved successfully"
      )
    );
});

const createFlaggedContent = catchAsync(async (req, res) => {
  const flaggedContent = await flaggedcontentService.createFrageContent(
    req.body
  );

  return res
    .status(StatusCodes.CREATED)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        flaggedContent,
        "Flagged content created successfully"
      )
    );
});

const resolveFlageContent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const flaggedContent = await flaggedcontentService.getFlaggedContentById(id);

  if (!flaggedContent) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Flagged content not found");
  }

  const resolvedContent = await flaggedcontentService.resolveFlaggedContent(id);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        resolvedContent,
        "Flagged content resolved successfully"
      )
    );
});

module.exports = {
  getAllFlaggedContents,
  createFlaggedContent,
  resolveFlageContent,
};
