from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.recipe_routes import recipe_bp

load_dotenv()

app = Flask(__name__)
CORS(app)

app.register_blueprint(recipe_bp)



@app.route("/", methods=["GET"])
def home():
    return "Backend is running!"

if __name__ == "__main__":
    app.run(debug=True)