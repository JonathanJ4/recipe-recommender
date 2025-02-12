import requests
import os
import logging
from utils.helpers import simplify_recipe_data


cache = {}

def fetch_recipes(ingredients):
    SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")
    logging.info(f"🔍 Checking cache for: {ingredients}") 

    
    
    if ingredients in cache:
        print(f"✅ Cache HIT for: {ingredients}")  # ✅ Debug print
        logging.info(f"Cache hit for ingredients: {ingredients}")
        return cache[ingredients]
    
    logging.info(f"❌ Cache MISS for: {ingredients}") 

    try:
        response = requests.get(
            "https://api.spoonacular.com/recipes/findByIngredients",
            params={
                "ingredients": ingredients,
                "number": 5,
                "apiKey": SPOONACULAR_API_KEY,
            },
            timeout=5
        )
        response.raise_for_status()

    except requests.exceptions.HTTPError as http_err:
        logging.error(f"HTTP error occurred: {http_err}")  # Log HTTP errors
        raise Exception("Failed to fetch recipes. Please try again later.")

    except requests.exceptions.Timeout:
        logging.error("Request timed out while fetching recipes.")
        raise Exception("Request timed out. Please try again later.")

    except requests.exceptions.RequestException as err:
        logging.error(f"Error: {err}")
        raise Exception("An unexpected error occurred.")

    recipes = response.json()
    simplified_recipes=simplify_recipe_data(recipes)

    logging.info(f"📦 Caching data for: {ingredients}")  # ✅ Debug print
    cache[ingredients] = simplified_recipes

    return simplified_recipes