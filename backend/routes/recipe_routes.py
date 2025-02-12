from flask import Blueprint, request, jsonify
from services.recipe_service import fetch_recipes
import logging

recipe_bp = Blueprint('recipe_bp', __name__)

@recipe_bp.route("/recipes", methods=["POST"])
def get_recipes():
    try:
        data = request.get_json()

        # 🛑 **Check if ingredients are missing**
        if not data or "ingredients" not in data:
            return jsonify({"error": "❌ Missing 'ingredients' field in request."}), 400

        ingredients = data.get("ingredients")
        cuisine = data.get("cuisine", None)
        diet = data.get("diet", None)
        max_time = data.get("max_time", None)

        # 🛑 **Validate max_time (must be an integer)**
        if max_time is not None:
            try:
                max_time = int(max_time)
                if max_time <= 0:
                    return jsonify({"error": "⏳ 'max_time' must be a positive number."}), 400
            except ValueError:
                return jsonify({"error": "⏳ 'max_time' must be an integer."}), 400

        # ✅ **Fetch recipes with error handling**
        try:
            recipes = fetch_recipes(ingredients, cuisine, diet, max_time)
            return jsonify({"recipes": recipes})
        except Exception as e:
            logging.error(f"❗ Internal error while fetching recipes: {e}")
            return jsonify({"error": "⚠️ Failed to fetch recipes. Please try again later."}), 500

    except Exception as e:
        logging.error(f"❗ Unexpected error in /recipes route: {e}")
        return jsonify({"error": "⚠️ Something went wrong. Please check your request format."}), 500
