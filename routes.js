const express = require("express");
const data = require("./assets/data.json");
const admin = require("./controllers/admin");
const recipes = require("./controllers/recipes");

const routes = express.Router();

routes.get("/", recipes.index);

routes.get("/about", recipes.about);

routes.get("/recipes", recipes.list);

routes.get("/recipes/:id", recipes.show);

// ADMIN SESSION

routes.get("/admin/recipes", admin.index);

routes.get("/admin/recipes/:id", admin.show);

module.exports = routes;
