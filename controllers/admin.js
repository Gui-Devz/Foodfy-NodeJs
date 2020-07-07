const data = require("../assets/data.json");
const utils = "../assets/utils.js";
const positiongID = utils.positiongID;
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

exports.create = (req, res) => {
  return res.render();
};

exports.post = (req, res) => {
  const { id, image, ingredients, preparation, information } = req.body;
  const keys = Object.keys(req.body);

  console.log(req.body);
  for (const key of keys) {
    if (key == "") {
      return res.send("Fill all the fields!");
    }
  }

  const newRecipe = {
    ...recipe,
    ...req.body,
    id: positiongID(id),
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

  console.log(req.body);
  for (const key of keys) {
    if (key == "") {
      return res.send("Fill all the fields!");
    }
  }

  let foundIndex = 0;
  const recipe = data.recipes.find((recipe, index) => {
    if (recipe.id == id) {
      foundIndex = index;
      return true;
    }
  });

  data.recipes[foundIndex] = {
    ...recipe,
    ...req.body,
    id: Number(id),
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
