from flask import Flask
from blueprints.users.users import users
from blueprints.friends.friends import friends
from flask_jwt_extended import JWTManager
from datetime import timedelta
from dotenv import load_dotenv
import os

# Simply for testing purposes
load_dotenv()

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

app.register_blueprint(users, url_prefix="/users")
app.register_blueprint(friends, url_prefix="/friends")

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
