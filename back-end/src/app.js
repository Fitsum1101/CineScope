const express = require("express");
const routeIndex = require("./index");
const { notFoundHandler, errorHandler } = require("./utils/errorHandler");

const app = express();

app.get("/", (_, res) => {
  res.json({
    message: "Welcome to the cinscop movie API",
    status: "Success✅",
    server_status: `Working🆙`,
    restart_working: "true",
    server_time: `${new Date().toLocaleString()} ⌛`,
  });
});

app.use("/api/v1/movies", routeIndex.movies.movieRoutes);
app.use("/api/v1/users", routeIndex.users.userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
