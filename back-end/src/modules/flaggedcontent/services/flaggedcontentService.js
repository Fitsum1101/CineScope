// flaggedcontentService code

const { prisma } = require("../../../config/db");

const createFrageContent = async (data) => {
  return await prisma.flaggedContent.create({ data });
};

const getFlaggedContent = async (filters = {}) => {
  const { page = 1, limit = 10, pagination = true } = filters;

  const take = Number(limit);
  const currentPage = Math.max(1, Number(page));
  const skip = (currentPage - 1) * take;

  // Base filter
  const where = {
    resolved: false,
  };

  // Count total records
  const totalFlaggedContents = await prisma.flaggedContent.count({ where });

  let paginationInfo = {};

  if (pagination) {
    const totalPage = Math.ceil(totalFlaggedContents / take);

    paginationInfo = {
      currentPage: Math.min(currentPage, totalPage),
      prevPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: currentPage < totalPage ? currentPage + 1 : null,
      endPage: totalPage,
      totalItems: totalFlaggedContents,
    };
  }

  // Fetch data
  const flaggedContents = await prisma.flaggedContent.findMany({
    where,
    ...(pagination && { skip, take }),
  });

  return {
    flaggedContents,
    ...(pagination ? paginationInfo : {}),
  };
};

const getFlaggedContentById = async (id) => {
  return await prisma.flaggedContent.findUnique({
    where: {
      id,
    },
  });
};

const resolveFlaggedContent = async (id) => {
  return await prisma.flaggedContent.update({
    where: { id },
    data: { resolved: true },
  });
};

module.exports = {
  createFrageContent,
  getFlaggedContent,
  resolveFlaggedContent,
  getFlaggedContentById,
};
