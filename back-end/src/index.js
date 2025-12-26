const users = require("./modules/user/index");
const movies = require("./modules/movie/index");
const auth = require("./modules/auth/index");
const flagentContet = require("./modules/flaggedcontent/index");

module.exports = {
  users,
  movies,
  auth,
  flagentContet,
};
