// src/scripts/main.js

document.addEventListener("DOMContentLoaded", () => {
  const recipeList = document.getElementById("recipe-list");

  const recipes = [
    {
      title: "Spaghetti Carbonara",
      image: "https://via.placeholder.com/150",
      description:
        "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
    },
    {
      title: "Chicken Curry",
      image: "https://via.placeholder.com/150",
      description:
        "A flavorful Indian dish made with tender chicken pieces cooked in a spicy curry sauce.",
    },
    {
      title: "Beef Tacos",
      image: "https://via.placeholder.com/150",
      description:
        "Delicious Mexican tacos filled with seasoned beef, fresh vegetables, and cheese.",
    },
  ];

  function renderRecipes(recipes) {
    recipeList.innerHTML = "";
    recipes.forEach((recipe) => {
      const recipeCard = document.createElement("div");
      recipeCard.className = "bg-white rounded-lg shadow-md overflow-hidden";

      recipeCard.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-32 sm:h-48 object-cover">
        <div class="p-4">
          <h3 class="font-bold text-lg">${recipe.title}</h3>
          <p class="text-gray-600 mt-2">${recipe.description}</p>
        </div>
      `;

      recipeList.appendChild(recipeCard);
    });
  }

  renderRecipes(recipes);
});
