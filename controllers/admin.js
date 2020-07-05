const data = require("../assets/data.json");
const fs = require("fs");
const { render } = require("nunjucks");

exports.index = (req, res) => {
  return res.render("admin/index", { recipes: data.recipes });
};

exports.show = (req, res) => {
  const { id } = req.params;

  const recipe = data.recipes.find((recipe) => {
    return recipe.id == id;
  });

  return res.render("admin/recipe", { recipe });
};
