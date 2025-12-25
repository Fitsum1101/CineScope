// =================== HELPER FUNCTIONS ===================

const formatChartData = (growthData, groupBy) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const labels = growthData.map((item) => {
    const date = new Date(item.period);
    if (groupBy === "week") {
      return `Week ${date.getWeek()}`; // You'd need a getWeek function
    }
    return monthNames[date.getMonth()];
  });

  return {
    type: "line", // Can also be 'bar'
    labels: labels,
    datasets: [
      {
        label: "New Users",
        data: growthData.map((item) => Number(item.new_users)),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        yAxisID: "y",
      },
      {
        label: "Cumulative Users",
        data: growthData.map((item) => Number(item.cumulative_users)),
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
        yAxisID: "y",
      },
      {
        label: "Growth Rate %",
        data: growthData.map((item) => Number(item.growth_rate_percent) || 0),
        borderColor: "#F59E0B",
        backgroundColor: "transparent",
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        yAxisID: "y1",
      },
    ],
  };
};

/**
 * Calculate growth metrics and insights
 */

const calculateGrowthMetrics = (growthData) => {
  if (!growthData.length) return null;

  const totalNewUsers = growthData.reduce(
    (sum, item) => sum + Number(item.new_users),
    0
  );

  const totalActiveUsers = growthData.reduce(
    (sum, item) => sum + Number(item.active_users),
    0
  );
  const totalLoggedIn = growthData.reduce(
    (sum, item) => sum + Number(item.logged_in_users),
    0
  );

  const growthRates = growthData
    .map((item) => Number(item.growth_rate_percent) || 0)
    .filter((rate) => !isNaN(rate));

  const avgGrowthRate = growthRates.length
    ? growthRates.reduce((a, b) => a + b) / growthRates.length
    : 0;

  const peakMonth = growthData.reduce((max, item) =>
    Number(item.new_users) > Number(max.new_users) ? item : max
  );

  return {
    summary: {
      totalNewUsers,
      totalActiveUsers,
      totalLoggedIn,
      activationRate: Math.round((totalActiveUsers / totalNewUsers) * 100),
      retentionRate: Math.round((totalLoggedIn / totalNewUsers) * 100),
      averageGrowthRate: Math.round(avgGrowthRate * 100) / 100,
    },
    insights: {
      peakMonth: {
        period: peakMonth.period_label,
        users: Number(peakMonth.new_users),
        growthRate: Number(peakMonth.growth_rate_percent) || 0,
      },
      growthTrend:
        avgGrowthRate > 0
          ? "increasing"
          : avgGrowthRate < 0
          ? "decreasing"
          : "stable",
      momentum: calculateMomentum(growthData),
    },
  };
};

/**
 * Calculate growth momentum (acceleration/deceleration)
 */

const calculateMomentum = (growthData) => {
  if (growthData.length < 3) return "insufficient data";

  const lastThree = growthData.slice(-3);
  const changes = lastThree.map(
    (item) => Number(item.growth_rate_percent) || 0
  );

  if (changes[2] > changes[1] && changes[1] > changes[0]) return "accelerating";
  if (changes[2] < changes[1] && changes[1] < changes[0]) return "decelerating";
  return "stable";
};

const getUserGrowthPrismaOnly = async () => {
  const fiveMonthsAgo = new Date();
  fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);

  // Get all users from last 5 months
  const users = await prisma.user.findMany({
    where: {
      dateJoined: {
        gte: fiveMonthsAgo,
      },
    },
    select: {
      dateJoined: true,
      isActive: true,
      lastLogin: true,
    },
    orderBy: {
      dateJoined: "asc",
    },
  });

  // Group by month manually
  const monthlyGroups = {};

  users.forEach((user) => {
    const monthKey = `${user.dateJoined.getFullYear()}-${
      user.dateJoined.getMonth() + 1
    }`;

    if (!monthlyGroups[monthKey]) {
      monthlyGroups[monthKey] = {
        newUsers: 0,
        activeUsers: 0,
        loggedInUsers: 0,
      };
    }

    monthlyGroups[monthKey].newUsers++;
    if (user.isActive) monthlyGroups[monthKey].activeUsers++;
    if (user.lastLogin) monthlyGroups[monthKey].loggedInUsers++;
  });

  // Convert to array format
  const growthData = Object.entries(monthlyGroups)
    .map(([monthKey, data]) => ({
      period: monthKey,
      ...data,
    }))
    .sort((a, b) => a.period.localeCompare(b.period))
    .slice(0, 5); // Get first 5 months

  return growthData;
};

const getUserGrowthAnalysis = async (options = {}) => {
  const {
    includeMetrics = true, // Include summary metrics
    groupBy = "month", // Group by 'month' or 'week'
  } = options;

  const growthData = await getUserGrowthPrismaOnly();

  // 4. Format data for charts
  const chartData = formatChartData(growthData, groupBy);

  // 5. Calculate metrics (optional)
  const metrics = includeMetrics ? calculateGrowthMetrics(growthData) : null;

  return {
    chart: chartData,
    ...(metrics && { metrics }),
    rawData: growthData,
  };
};

module.exports = {
  getUserGrowthAnalysis,
};
