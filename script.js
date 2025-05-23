// script.js

console.log("🔍 script.js loaded");

// 1) Sample data (keep this for now)
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

// 2) Trending recipes (landing page)
const trendingSection = document.querySelector(".trending");

if (trendingSection) {
  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6";
  trendingSection.appendChild(grid);

  recipes
    .slice()
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3)
    .forEach(r => {
      const card = document.createElement("div");
      card.className =
        "bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden";

      card.innerHTML = `
        <img
          class="w-full h-40 object-cover"
          src="${r.image}"
          alt="${r.title}"
        />
        <div class="p-4">
          <h4 class="font-semibold text-lg mb-1">${r.title}</h4>
          <p class="text-gray-600 text-sm">${r.description}</p>
        </div>
      `;
      grid.appendChild(card);
    });
}

// 3) SEARCH page logic with meal-type filter
const searchInput      = document.getElementById("searchInput");
const mealSelect       = document.getElementById("mealTypeFilter");
const resultsContainer = document.getElementById("recipeResults");

if (searchInput && mealSelect && resultsContainer) {
  // Render any list of recipes into the resultsContainer
  function displaySearchResults(list) {
    resultsContainer.innerHTML = "";

    if (list.length === 0) {
      resultsContainer.innerHTML =
        '<p class="text-center text-gray-500 mt-6">No recipes found.</p>';
      return;
    }

    // Build a fresh grid
    const grid = document.createElement("div");
    grid.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6";
    resultsContainer.appendChild(grid);

    list.forEach(r => {
      const card = document.createElement("div");
      card.className =
        "bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden";

      card.innerHTML = `
        <img
          class="w-full h-40 object-cover"
          src="${r.image}"
          alt="${r.title}"
        />
        <div class="p-4">
          <h4 class="font-semibold text-lg mb-1">${r.title}</h4>
          <p class="text-gray-600 text-sm">${r.description}</p>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // Combine text + meal filters, then render
  function filterAndDisplay() {
    const textQ = searchInput.value.toLowerCase().trim();
    const mealF = mealSelect.value; // "" | "breakfast" | "lunch" | "dinner"

    const filtered = recipes.filter(r => {
      const matchesText = r.title.toLowerCase().includes(textQ);
      const matchesMeal = mealF === "" || r.mealType === mealF;
      return matchesText && matchesMeal;
    });

    displaySearchResults(filtered);
  }

  // Initial render (all recipes)
  filterAndDisplay();

  // React to user input
  searchInput.addEventListener("input",  filterAndDisplay);
  mealSelect.addEventListener("change", filterAndDisplay);
}
