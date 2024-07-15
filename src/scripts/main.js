// src/scripts/main.js
import config from "../config.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const recipeList = document.getElementById("recipe-list");

  searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    if (query) {
      fetchRecipes(query);
    }
  });

  async function fetchRecipes(query) {
    const endpoint = `https://api.edamam.com/search?q=${query}&app_id=${config.APP_ID}&app_key=${config.APP_KEY}&from=0&to=10`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      renderRecipes(data.hits);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }

  function renderRecipes(recipes) {
    recipeList.innerHTML = "";
    recipes.forEach((recipeData) => {
      const recipe = recipeData.recipe;
      const recipeCard = document.createElement("div");
      recipeCard.className = "bg-white rounded-lg shadow-md overflow-hidden";

      recipeCard.innerHTML = `
        <img src="${recipe.image}" alt="${
        recipe.label
      }" class="w-full h-32 sm:h-48 object-cover">
        <div class="p-4">
          <h3 class="font-bold text-lg">${recipe.label}</h3>
          <p class="text-gray-600 mt-2">${recipe.ingredientLines.join(", ")}</p>
        </div>
      `;

      recipeList.appendChild(recipeCard);
    });
  }
});
