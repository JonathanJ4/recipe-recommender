import requests
import os
from utils.helpers import simplify_recipe_data

def fetch_recipes(ingredients):
    SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")

    response = requests.get(
        "https://api.spoonacular.com/recipes/findByIngredients",
        params={
            "ingredients": ingredients,
            "number": 5,
            "apiKey": SPOONACULAR_API_KEY,
        },
    )

    if response.status_code != 200:
        raise Exception("Failed to fetch recipes from Spoonacular.")

    recipes = response.json()
    return simplify_recipe_data(recipes)
