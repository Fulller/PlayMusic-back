const express = require("express");
const route = express.Router();
const apiController = require("../controllers/ApiController");
route.post("/register", apiController.register);
route.post("/login", apiController.login);
module.exports = route;
