const data = require("../assets/data.json");
const utils = require("../assets/utils.js");
const fs = require("fs");
const { findingRecipe } = require("../assets/utils.js");

exports.index = (req, res) => {
  return res.render("admin/index", { recipes: data.recipes });
};

exports.show = (req, res) => {
  const { id } = req.params;

  const searchRecipe = findingRecipe(data.recipes, id);

  const recipe = searchRecipe.recipe;

  if (!recipe) return res.send("Recipe not found!");

  return res.render("admin/recipe", { recipe });
};

exports.edit = (req, res) => {
  const { id } = req.params;

  const searchRecipe = findingRecipe(data.recipes, id);

  const recipe = searchRecipe.recipe;

  if (!recipe) return res.send("Recipe not found!");

  return res.render("admin/edit", { recipe });
};

exports.create = (req, res) => {
  return res.render("admin/create");
};

// FORM routes
exports.post = (req, res) => {
  const {
    image,
    title,
    author,
    ingredients,
    preparation,
    information,
  } = req.body;
  const keys = Object.keys(req.body);

  for (const key of keys) {
    if (key == "") {
      return res.send("Fill all the fields!");
    }
  }

  const id = utils.positioningID(data.recipes);

  const newRecipe = {
    id,
    image,
    title,
    author,
    ingredients,
    preparation,
    information,
  };

  data.recipes.push(newRecipe);

  fs.writeFile("./assets/data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.send("Error writting file!");
    } else {
      return res.redirect(`/admin/recipes/${id}`);
    }
  });
};

exports.put = (req, res) => {
  const { id, image, ingredients, preparation, information } = req.body;
  const keys = Object.keys(req.body);

  for (const key of keys) {
    if (key == "") {
      return res.send("Fill all the fields!");
    }
  }

  const searchRecipe = findingRecipe(data.recipes, id);

  const foundIndex = searchRecipe.index;
  const recipe = searchRecipe.recipe;

  const newIngredients = utils.cleaningEmptyIndex(ingredients);

  const newPreparation = utils.cleaningEmptyIndex(preparation);

  data.recipes[foundIndex] = {
    ...recipe,
    ...req.body,
    id: Number(id),
    ingredients: newIngredients,
    preparation: newPreparation,
  };

  fs.writeFile("./assets/data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.send("Error writting file!");
    } else {
      return res.redirect(`/admin/recipes/${id}`);
    }
  });
};

exports.delete = (req, res) => {
  const { id } = req.body;

  const recipesNotDeleted = data.recipes.filter((recipe) => {
    return recipe.id != id;
  });

  data.recipes = recipesNotDeleted;

  fs.writeFile("./assets/data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.send("Error writting File!");
    } else {
      return res.redirect("/admin/recipes");
    }
  });
};
