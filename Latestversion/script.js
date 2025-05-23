// script.js

console.log("🔍 script.js loaded");

// 1) Sample data
const recipes = [
  {
    title: "Quick Lunch Ideas",
    image: "https://picsum.photos/300/200?random=1",
    description: "Fast & tasty recipes ready in 15 minutes.",
    popularity: 80,
    mealType: "lunch"
  },
  {
    title: "Hearty Breakfast",
    image: "https://picsum.photos/300/200?random=2",
    description: "Start your day with a full and happy belly.",
    popularity: 95,
    mealType: "breakfast"
  },
  {
    title: "Cozy Dinner",
    image:  "https://picsum.photos/300/200?random=3",
    description: "Warm and comforting meals for the evening.",
    popularity: 70,
    mealType: "dinner"
  }
];

// 1. Select the container and only run on landing page
const trendingSection = document.querySelector(".trending");
if (trendingSection) {
  // make a Tailwind-powered grid container
  const cardContainer = document.createElement("div");
  cardContainer.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6";
  trendingSection.appendChild(cardContainer);

  // pick top-3 and render
  recipes
    .slice()
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3)
    .forEach(recipe => {
      const card = document.createElement("div");
      card.className =
        "bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden";

      card.innerHTML = `
        <img
          class="w-full h-40 object-cover"
          src="${recipe.image}"
          alt="${recipe.title}"
        />
        <div class="p-4">
          <h4 class="font-semibold text-lg mb-1">${recipe.title}</h4>
          <p class="text-gray-600 text-sm">${recipe.description}</p>
        </div>
      `;
      cardContainer.appendChild(card);
    });
}


if (searchInput && resultsContainer) {
  function displaySearchResults(list) {
    resultsContainer.innerHTML = "";
    if (!list.length) {
      resultsContainer.innerHTML = `<p class="text-center text-gray-500">No recipes found.</p>`;
      return;
    }
    // create a fresh grid
    const grid = document.createElement("div");
    grid.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6";
    resultsContainer.appendChild(grid);

    list.forEach(recipe => {
      const card = document.createElement("div");
      card.className =
        "bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden";
      card.innerHTML = `
        <img
          class="w-full h-40 object-cover"
          src="${recipe.image}"
          alt="${recipe.title}"
        />
        <div class="p-4">
          <h4 class="font-semibold text-lg mb-1">${recipe.title}</h4>
          <p class="text-gray-600 text-sm">${recipe.description}</p>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // initial render + input listener...


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
