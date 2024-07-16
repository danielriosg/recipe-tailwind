  // src/scripts/main.js
  import config from "../config.js";

  document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const recipeList = document.getElementById("recipe-list");

    function searchRecipes() {
      const query = searchInput.value.trim();
      if (query) {
        fetchRecipes(query);
      } else {
        displayErrorMessage("Please enter a search term.");
      }
    }

    searchButton.addEventListener("click", searchRecipes);

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.keyCode === 13) {
        searchRecipes();
      }
    });

    



    async function fetchRecipes(query) {
      const endpoint = `https://api.edamam.com/search?q=${query}&app_id=${config.APP_ID}&app_key=${config.APP_KEY}&from=0&to=10`;
      try {
        showLoadingIndicator();
        const response = await fetch(endpoint);
        if (!response.ok) {
          if (response.status === 400) {
            console.error("Invalid request:", response.statusText);
            displayErrorMessage("Invalid search query. Please try again.");
          } else {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
        }
        const data = await response.json();
        renderRecipes(data.hits);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        displayErrorMessage("Failed to load recipes. Please try again later.");
      } finally {
        hideLoadingIndicator();
      }
    }

function showLoadingIndicator() {
  const loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.style.display = "block";
}

function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.style.display = "none";
}

  function displayErrorMessage(message) {
    // Check if an error message is already being displayed
    const existingErrorContainer = document.querySelector(".error-message");
    if (existingErrorContainer) {
      return; // Exit the function if an error message is already present
    }

    // Create and display the error message
    const errorContainer = document.createElement("div");
    errorContainer.className =
      "error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative";
    errorContainer.innerText = message;
    document.body.appendChild(errorContainer);

    // Remove the error message after 5 seconds
    setTimeout(() => {
      errorContainer.remove();
    }, 5000);
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
