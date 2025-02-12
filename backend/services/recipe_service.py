import requests
import os
import logging
from utils.helpers import simplify_recipe_data

# ✅ Cache storage
cache = {}

def fetch_recipes(ingredients, cuisine=None, diet=None, max_time=None):
    SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")
    
    logging.info(f"🔍 Checking cache for: {ingredients} | Cuisine: {cuisine} | Diet: {diet} | Max Time: {max_time}")

    cache_key = (ingredients, cuisine, diet, max_time)  # ✅ Unique cache key for each filter set
    if cache_key in cache:
        logging.info(f"✅ Cache HIT for: {cache_key}")
        return cache[cache_key]
    
    logging.info(f"❌ Cache MISS for: {cache_key}")

    try:
        params = {
            "ingredients": ingredients,
            "number": 5,
            "apiKey": SPOONACULAR_API_KEY,
        }
        if cuisine:
            params["cuisine"] = cuisine
        if diet:
            params["diet"] = diet
        if max_time:
            params["maxReadyTime"] = max_time  # ⏳ Time in minutes

        response = requests.get(
            "https://api.spoonacular.com/recipes/complexSearch",  # ✅ Changed endpoint to support filters
            params=params,
            timeout=5
        )
        response.raise_for_status()

    except requests.exceptions.HTTPError as http_err:
        logging.error(f"HTTP error occurred: {http_err}")
        raise Exception("Failed to fetch recipes. Please try again later.")

    except requests.exceptions.Timeout:
        logging.error("Request timed out while fetching recipes.")
        raise Exception("Request timed out. Please try again later.")

    except requests.exceptions.RequestException as err:
        logging.error(f"Error: {err}")
        raise Exception("An unexpected error occurred.")

    recipes = response.json().get("results", [])  # ✅ Adjusted for new endpoint
    simplified_recipes = simplify_recipe_data(recipes)

    logging.info(f"📦 Caching data for: {cache_key}")
    cache[cache_key] = simplified_recipes

    return simplified_recipes
