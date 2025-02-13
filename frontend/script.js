document.getElementById("recipe-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const ingredients = document.getElementById("ingredients").value;
    const cuisine = document.getElementById("cuisine").value;
    const diet = document.getElementById("diet").value;
    const maxTime = document.getElementById("max-time").value;

    if (!ingredients) {
        alert("Please enter at least one ingredient.");
        return;
    }

    const requestData = { ingredients };
    if (cuisine) requestData.cuisine = cuisine;
    if (diet) requestData.diet = diet;
    if (maxTime) requestData.max_time = parseInt(maxTime);

    document.getElementById("loading").style.display = "block";
    document.getElementById("recipe-results").style.display = "none";

    try {
        const response = await fetch("http://127.0.0.1:5000/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        document.getElementById("loading").style.display = "none";

        if (!data.recipes || data.recipes.length === 0) {
            document.getElementById("recipe-container").innerHTML = "<p>No recipes found. Try different ingredients!</p>";
            document.getElementById("recipe-results").style.display = "block";
            return;
        }

        let html = "";
        data.recipes.forEach(recipe => {
            html += `
                <div class="recipe-card">
                    <h3>${recipe.name}</h3>
                    <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
                    <p><a href="${recipe.instructions}" target="_blank">View Recipe</a></p>
                </div>
            `;
        });

        document.getElementById("recipe-container").innerHTML = html;
        document.getElementById("recipe-results").style.display = "block";

    } catch (error) {
        document.getElementById("loading").style.display = "none";
        document.getElementById("recipe-container").innerHTML = "<p>⚠️ Failed to load recipes. Try again later.</p>";
        document.getElementById("recipe-results").style.display = "block";
    }
});
