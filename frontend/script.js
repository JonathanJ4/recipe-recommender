const recipes=[
  {
    title: "Quick Lunch Ideas",
    image: "placeholder aa",
    description: "something", 
  },
  {
    title: "Quick Lunch Ideas",
    image: "placeholder aa",
    description: "something", 
  },
  {
    title: "Quick Lunch Ideas",
    image: "placeholder aa",
    description: "something", 
  }
]

const trendingsection = document.querySelector('.trending')

const cardContainer = document.createElement('div')
cardContainer.classList.add('trending-card')

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
