const form = document.getElementById('ingredient-form');
const recipesContainer = document.getElementById('recipe-container');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ingredients = document.getElementById('ingredients').value;


    try{
    const response = await fetch("http://127.0.0.1:5000/recipes", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
    });
    const data = await response.json();
    displayRecipes(data.recipes);
}catch (error){
    console.log("Fetching recipes...");
console.log("Request Payload:", JSON.stringify({ ingredients }));

    console.error("Error Fetching Recipes", error);
    recipesContainer.innerHTML = "<p> Failed to load the recipes. Try again later";


}
});

function displayRecipes(recipes) {
    recipesContainer.innerHTML = ""
    if (!recipes.length) {
        recipesContainer.textContent = "No recipes found. Try something else"
        return;

    }

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
            <p>${recipe.instructions}</p>
        `;
        recipesContainer.appendChild(recipeDiv);
    });

}