// script.js

console.log("🔍 script.js loaded");

// 1) Sample data
const recipes = [
  {
    title: "Quick Lunch Ideas",
    image: "https://via.placeholder.com/300x200?text=Lunch",
    description: "Fast & tasty recipes ready in 15 minutes.",
    popularity: 80,
    mealType: "lunch"
  },
  {
    title: "Hearty Breakfast",
    image: "https://via.placeholder.com/300x200?text=Breakfast",
    description: "Start your day with a full and happy belly.",
    popularity: 95,
    mealType: "breakfast"
  },
  {
    title: "Cozy Dinner",
    image: "https://via.placeholder.com/300x200?text=Dinner",
    description: "Warm and comforting meals for the evening.",
    popularity: 70,
    mealType: "dinner"
  }
];


// 2) TRENDING injection—only on index.html
const trendingSection = document.querySelector(".trending");
if (trendingSection) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("trending-cards");
  trendingSection.appendChild(cardContainer);

  const trending = recipes
    .slice()
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  trending.forEach(recipe => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h4>${recipe.title}</h4>
      <p>${recipe.description}</p>
    `;
    cardContainer.appendChild(card);
  });
}

// 3) SEARCH page filtering—only on search.html
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("recipeResults");

if (searchInput && resultsContainer) {
  function displaySearchResults(list) {
    resultsContainer.innerHTML = "";
    if (list.length === 0) {
      resultsContainer.innerHTML = "<p>No recipes found.</p>";
      return;
    }
    list.forEach(recipe => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <h4>${recipe.title}</h4>
        <p>${recipe.description}</p>
      `;
      resultsContainer.appendChild(card);
    });
  }

  // initial render
  displaySearchResults(recipes);

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = recipes.filter(r =>
      r.title.toLowerCase().includes(query)
    );
    displaySearchResults(filtered);
  });
}
