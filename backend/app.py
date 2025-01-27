from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = Flask(__name__)
CORS(app)

SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")

@app.route("/", methods=["GET"])
def home():
    return "Backend is running!"

@app.route("/recipes", methods=["POST"])
def get_recipes():
    data = request.get_json()
    ingredients = data.get("ingredients")

    if not ingredients:
        return jsonify({"error": "No ingredients provided."}), 400

    # Call Spoonacular API
    response = requests.get(
        "https://api.spoonacular.com/recipes/findByIngredients",
        params={
            "ingredients": ingredients,
            "number": 5,  # Limit to 5 recipes
            "apiKey": SPOONACULAR_API_KEY,
        },
    )

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch recipes from Spoonacular."}), 500

    recipes = response.json()

    # Simplify recipe data for frontend
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

    return jsonify({"recipes": simplified_recipes})

if __name__ == "__main__":
    app.run(debug=True)
