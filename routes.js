const express = require("express");
const data = require("./assets/data");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.render("index", { recipes: data });
});

routes.get("/about", (req, res) => {
  return res.render("about");
});

routes.get("/recipes", (req, res) => {
  return res.render("recipes", { recipes: data });
});

routes.get("/recipe", (req, res) => {
  const id = req.query.id;

  const recipe = data.find((recipe) => {
    return recipe.id == id;
  });

  return res.render("recipe", { recipe });
});

module.exports = routes;
