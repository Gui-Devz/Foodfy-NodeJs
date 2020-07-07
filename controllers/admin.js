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

  if (!recipe) return res.send("Recipe not found!");

  return res.render("admin/recipe", { recipe });
};

exports.edit = (req, res) => {
  const { id } = req.params;

  const recipe = data.recipes.find((recipe) => {
    return recipe.id == id;
  });

  if (!recipe) return res.send("Recipe not found!");

  return res.render("admin/edit", { recipe });
};

exports.put = (req, res) => {
  const { id, image, ingredients, steps, information } = req.body;
  const keys = Object.keys(req.body);

  for (const key of keys) {
    if (key == "") {
      return res.send("Fill all the fields!");
    }
  }
};
