from datetime import timedelta
from flask import Flask, request, jsonify
from database_connector import *
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

'''
    Endpoint for creating a new user and inserting into the database,
    returns a message stating sign up success and a user dictionary
'''
@app.post('/signup')
def signup():
    data = request.json
    new_user = sign_up(data["username"], data["password"], data["email"])
    if not new_user:
        return jsonify({"Error": "Sign Up Failed, Username or email already exists"}), 400
    
    access_token = create_access_token(identity=str(new_user["user_id"]))

    return jsonify({"Message": "Account creation successful!",
                    "User": {
                        "user_id": new_user["user_id"],
                        "username": new_user["username"]
                    },
                    "Token": access_token}), 201

'''
    Endpoint for logging into the application, returns a user 
    dictionary for user logged in, a message stating login status,
    and a token for authentication
'''
@app.post('/login')
def login():
    data = request.json
    user = get_user(data["username"], data["password"])
    if not user:
        return jsonify({"Error": "Invalid username or password"}), 401
    
    access_token = create_access_token(identity=str(user["user_id"]))

    return jsonify({"Message": "Login Successful!", 
                    "User": {
                        "user_id": user["user_id"],
                        "username": user["username"]
                    },
                    "Token": access_token}), 200

'''
    Endpoint for deleting a user from the database, returns the messsage 
    for deletion status
'''
@app.delete('/delete_user')
@jwt_required()
def delete():
    data = request.json
    user_id = get_jwt_identity()
    success = delete_user(user_id, data["password"])
    if not success:
        return jsonify({"Error": "Delete Failed"}), 401
    return jsonify({"Message": "Account delete successful!"}), 200

'''
    Endpoint for updating username, returns the message for whether the username
    update was successful or not.
'''
@app.post('/update_username')
@jwt_required()
def update_user():
    data = request.json
    user_id = get_jwt_identity()
    status = update_username(user_id, data["new_user"])

    if status == "user_not_found":
        return jsonify({"Error": "The user cannot be found"}), 404
    elif status == "new_username_exists":
        return jsonify({"Error": "The new username is already taken"}), 409
    return jsonify({"Message": "Username update successful!"}), 200

'''
    Endpoint for updating password, returns the message for whether the password
    update was successful or not.
'''
@app.post('/update_password')
@jwt_required()
def update_pass():
    data = request.json
    user_id = get_jwt_identity()
    success = update_password(user_id, data["old_password"], data["new_password"])
    if not success:
        return jsonify({"Error": "Password update failed"}), 400
    return jsonify({"Message": "Password update successful!"}), 200

'''
    Endpoint for getting all users in the database, returns message for whether retrieval
    was successful.
'''
@app.get('/get_users')
@jwt_required()
def get_users():
    users = get_all_users()
    if not users:
        return jsonify({"Error": "Error fetching all users."}), 400
    return jsonify({"Message": "Successful retrieval of users!",
                    "Users": [{"username": user["username"], "user_id": user["user_id"]} for user in users]}), 200

'''
    Endpoint for retrieving the user based on the token passed in, returns 
    whether user retrieval was successful and the user dictionary
'''
@app.get('/profile')
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = get_user_by_id(user_id)
    if not user:
        return jsonify({"Error": "Authentication error, user not retrieved"})
    return jsonify({"Message": "User successfully retrieved!",
                    "User": dict(user)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
