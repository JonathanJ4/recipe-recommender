const recipes=[
  {
    title: "Quick Lunch Ideas",
    image: "https://via.placeholder.com/250x150",
    description: "something", 
  },
  {
    title: "Quick Lunch Ideas",
    image: "https://via.placeholder.com/250x150",
    description: "https://via.placeholder.com/250x150", 
  },
  {
    title: "Quick Lunch Ideas",
    image: "https://via.placeholder.com/250x150",
    description: "something", 
  }
]

const trendingsection = document.querySelector('.trending')

const cardContainer = document.createElement('div')
cardContainer.classList.add('trending-cards')

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
