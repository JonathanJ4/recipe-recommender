from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.recipe_routes import recipe_bp
import logging

load_dotenv()

logging.basicConfig(
    level=logging.INFO,  # Ensures INFO level messages are displayed
    format='%(asctime)s - %(levelname)s - %(message)s'  # Date, log level, message
)

# Disable werkzeug default logger to avoid interference
log = logging.getLogger('werkzeug')
log.setLevel(logging.WARNING)

# ✅ Add a test log to confirm logging works
logging.info("🚀 Server started successfully!")

app = Flask(__name__)
CORS(app)

app.register_blueprint(recipe_bp)



@app.route("/", methods=["GET"])
def home():
    return "Backend is running!"

if __name__ == "__main__":
    app.run(debug=True)


