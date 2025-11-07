from flask import Flask, request, jsonify
from database_connector import sign_up, get_user
app = Flask(__name__)

@app.post('/signup')
def signup():
    data = request.json
    success = sign_up(data["username"], data["password"], data["email"])
    if not success:
        return jsonify({"Error": "Sign Up Failed, Username or email already exists"}), 400
    return jsonify({"Message": "Account creation successful!"}), 201


@app.post('/login')
def login():
    data = request.json
    user = get_user(data["username"], data["password"])
    if not user:
        return jsonify({"Error": "Invalid username or password"}), 401
    return jsonify({"Message": "Login Successful!", 
                    "User": dict(user)}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
    
