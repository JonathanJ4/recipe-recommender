def simplify_recipe_data(recipes):
    simplified_recipes = [
        {
            "name": recipe.get("title"),
            "ingredients": [
                ingredient["name"] for ingredient in recipe.get("usedIngredients", [])
            ] + [
                ingredient["name"] for ingredient in recipe.get("missedIngredients", [])
            ],
            "instructions": "Visit: " + recipe.get("sourceUrl", "No URL available"),
        }
        for recipe in recipes
    ]
    return simplified_recipes
