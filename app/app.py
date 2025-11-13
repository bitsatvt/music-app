from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)

# CONFIGRING CONNECTION TO THE DATABASE
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:hung25032007@localhost/music_app_db'
app.config['SECRET_KEY'] = 'supersecretkeymusicapp'

# JWT config
app.config["JWT_SECRET_KEY"] = "super-secret-jwt-key-for-music-app"

db = SQLAlchemy(app)
jwt = JWTManager(app)

class User(db.Model):
    __tablename__   = "users"
    user_id         = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    username        = db.Column(db.String(50), nullable=False)
    password_hash   = db.Column(db.String(255), nullable=False)
    email           = db.Column(db.String(100), nullable=False, unique=True)
    creation_date   = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"User(id = {self.user_id}, name = {self.username}, email = {self.email})"

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


# Main page
@app.route('/')
def home():
    return jsonify({"status": "ok"}) # Health check

# Register: expects JSON { "username": "...", "email": "...", "password": "..." }
# Implement token 
@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing JSON body"}), 400

    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if not username or not email or not password:
        return jsonify({"error": "Username, email, and password required"}), 400

    user = User.query.filter_by(email=email).first()
    # Check if the user email already existed
    if user:
        return jsonify({"error": "User with this email already exists"}), 409
    else:
        # Create a new user
        user = User(username=username, email=email)
        user.set_password(password) # password_hash is set here 
        db.session.add(user)
        db.session.commit()
        
        return jsonify({
            "message": "User registered",
            "user": {
                "user_id": user.user_id,
                "username": user.username,
                "email": user.email,
            },
        }), 201
    

# Login
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing JSON body"}), 400
    
    # Collect info from the json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Create a new token
    # identity must be a string 
    access_token = create_access_token(identity=str(user.user_id))

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "user_id": user.user_id,
            "username": user.username,
            "email": user.email,
        }
    }), 200


# Dashboard
@app.route("/api/me", methods=["GET"])
@jwt_required()
def me():
    # We want the id to be an integer
    current_user_id = int(get_jwt_identity())
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "user_id": user.user_id,
        "username": user.username,
        "email": user.email,
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
    
