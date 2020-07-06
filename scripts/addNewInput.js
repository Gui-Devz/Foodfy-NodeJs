function addIngredient() {
  const inputs = document.querySelectorAll(".inputs");
  const inputElements = document.querySelectorAll(".input");

  inputs.forEach(() => {
    // Realiza um clone do último ingrediente adicionado
    const newField = inputElements[inputElements.length - 1].cloneNode(true);

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;

    // Deixa o valor do input vazio
    newField.children[0].value = "";
    input.appendChild(newField);
  });
}

document
  .querySelectorAll(".add-ingredient")
  .forEach(addEventListener("click", addIngredient));
