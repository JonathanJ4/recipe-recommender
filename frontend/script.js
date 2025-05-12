const recipes = [
  {
    title: "Quick Lunch Ideas",
    image: "https://via.placeholder.com/250x150",
    description: "Fast and tasty recipes you can make in minutes.",
  },
  {
    title: "Hearty Breakfast",
    image: "https://via.placeholder.com/250x150",
    description: "Start your day with a full and happy belly.",
  },
  {
    title: "Comforting Dinner",
    image: "https://via.placeholder.com/250x150",
    description: "Warm meals to end your day on a cozy note.",
  }
];


const trendingSection = document.querySelector('.trending');

const cardContainer = document.createElement('div');
cardContainer.classList.add('trending-cards');

recipes.forEach(recipe => {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.title}">
    <h4>${recipe.title}</h4>
    <p>${recipe.description}</p>
  `;

  cardContainer.appendChild(card);
});

trendingSection.appendChild(cardContainer);
const searchButton = document.querySelector('.search-cta button');
searchButton.addEventListener('click', () => {
  alert("Let's go find a recipe!");
});

const searchInput = document.getElementById("searchInput")
const resultsContainer = document.getElementById("recipeResults")

function displayRecipes(filteredRecipes){
  resultsContainer.innerHTML = "";

  if (filteredRecipes.length == 0){
    resultsContainer.innerHTML = "<p> No recipes found </p>"
  }
}