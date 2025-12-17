const express = require("express");
const { notFoundHandler, errorHandler } = require("./utils/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

app.use(notFoundHandler);
app.use(errorHandler);

app.get("/", (_, res) => {
  res.json({
    message: "Welcome to the cinscop movie API",
    status: "Success✅",
    server_status: `Working🆙`,
    restart_working: "true",
    server_time: `${new Date().toLocaleString()} ⌛`,
  });
});

module.exports = app;
