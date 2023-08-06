const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authentication;
};

module.exports = auth;
