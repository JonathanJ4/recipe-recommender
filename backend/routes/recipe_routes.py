from flask import Blueprint, request, jsonify
from services.recipe_service import fetch_recipes
import logging  # ✅ Added for error logging

# Blueprint to group related routes
recipe_bp = Blueprint('recipe_bp', __name__)

@recipe_bp.route("/recipes", methods=["POST"])
def get_recipes():
    data = request.get_json()
    ingredients = data.get("ingredients")

    if not ingredients:
        return jsonify({"error": "No ingredients provided."}), 400

    try:
        # ✅ Error handling with try-except block
        recipes = fetch_recipes(ingredients)
        return jsonify({"recipes": recipes})

    except Exception as e:
        # ✅ Logs the actual error for debugging
        logging.error(f"Error fetching recipes: {e}")

        # ✅ User-friendly error message
        return jsonify({"error": "Oops! Something went wrong. Please try again later."}), 500
