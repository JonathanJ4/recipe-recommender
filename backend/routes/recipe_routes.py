from flask import Blueprint, request, jsonify
from services.recipe_service import fetch_recipes

# Blueprint to group related routes
recipe_bp = Blueprint('recipe_bp', __name__)

@recipe_bp.route("/recipes", methods=["POST"])
def get_recipes():
    data = request.get_json()
    ingredients = data.get("ingredients")

    if not ingredients:
        return jsonify({"error": "No ingredients provided."}), 400

    # Call service to fetch recipes
    recipes = fetch_recipes(ingredients)
    return jsonify({"recipes": recipes})
