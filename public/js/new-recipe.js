let newPost = document.querySelector("#createCard");
const ingboxes = document.querySelector("#ingboxes");
const typeboxes = document.querySelector("#typeboxes");

const ingredientList = async () => {
  const getIngredients = await fetch(`/api/ingredient`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (getIngredients) {
    let localList = await getIngredients.json();
    console.log(localList);
    
    for (i = 0; i < localList.length; i++) {

      var checkForm = document.createElement("div");
      var inputField = document.createElement("input");

      inputField.setAttribute("type", "checkbox");
      //inputField.setAttribute("id", "checkboxIng");
      inputField.setAttribute("value", localList[i].id);
      inputField.classList.add("form-check-input", "checkboxIng");

      var inputLabel = document.createElement("label");
      checkForm.classList.add("form-check");
      inputLabel.classList.add("form-check-label");
      inputLabel.innerText = localList[i].ingredient_name;
      
      checkForm.appendChild(inputField);
      checkForm.appendChild(inputLabel);
      ingboxes.appendChild(checkForm);
    }
  }
};
const typeList = async () => {
  const getTypes = await fetch(`/api/categorytype`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (getTypes) {
    let localList = await getTypes.json();
    console.log(localList);
    for (i = 0; i < localList.length; i++) {

      var checkForm = document.createElement("div");
      var inputField = document.createElement("input");
      inputField.setAttribute("type", "checkbox");
      //inputField.setAttribute("id", "checkboxType");
      inputField.setAttribute("value", localList[i].id);
      inputField.classList.add("form-check-input", "checkboxType");

      var inputLabel = document.createElement("label");
      checkForm.classList.add("form-check");
      inputLabel.classList.add("form-check-label");
      inputLabel.innerText = localList[i].categoryType_name;

      checkForm.appendChild(inputField);
      checkForm.appendChild(inputLabel);
      typeboxes.appendChild(checkForm);
    }
  }
};

//POST new recipe
newPost.addEventListener("click", async function (event) {
  event.preventDefault();
  const cocktail_name = document.querySelector("#recipe-name").value.trim();
  const instructions = document.querySelector("#recipe-content").value.trim();

  let checkedIng = document.querySelectorAll(".checkboxIng");
  let checkedType = document.querySelectorAll(".checkboxType");

  function chosenType() {
    let categoryTypeIds = [];

    for (i = 0; i > checkedType.length; i++) {
      if (checkedType[i].checked) {
        categoryTypeIds.push(checkedType[i].value);
      }
      
    }
    return categoryTypeIds;
  };

  function chosenIds() {
    let ingredientIds = [];

    for (i = 0; i > checkedIng.length; i++) {
      if (checkedIng[i].checked) {
        ingredientIds.push(checkedIng[i].value);
      }
    }
    return ingredientIds;

  };

  let ingredientIds = chosenIds()
  let categoryTypeIds = chosenType()

  console.log(`array ${ingredientIds}`)
  console.log(`array2 ${categoryTypeIds}`)

  const response = await fetch(`/api/cocktail`, {
    method: "POST",
    body: JSON.stringify({
      cocktail_name,
      instructions,
      ingredientIds,
      categoryTypeIds,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert("Failed to publish!");
  }
});
ingredientList();
typeList();
