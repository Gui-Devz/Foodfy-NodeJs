const data = require("../assets/data.json");

exports.index = (req, res) => {
  return res.render("recipes/index", { recipes: data.recipes });
};

exports.about = (req, res) => {
  return res.render("recipes/about");
};

exports.list = (req, res) => {
  return res.render("recipes/recipes", { recipes: data.recipes });
};

exports.show = (req, res) => {
  const { id } = req.params;

  const recipe = data.recipes.find((recipe) => {
    return recipe.id == id;
  });

  return res.render("recipes/recipe", { recipe });
};
