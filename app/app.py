from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from werkzeug.security import generate_password_hash

app = Flask(__name__)

# CONFIGRING CONNECTION TO THE DATABASE
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:hung25032007@localhost/music_app_db'
app.config['SECRET_KEY'] = 'supersecretkeymusicapp'
db = SQLAlchemy(app)
api = Api(app)

class User(db.Model):
    __tablename__   = "users"
    user_id         = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    username        = db.Column(db.String(50), nullable=False)
    password_hash   = db.Column(db.String(255), nullable=False)
    email           = db.Column(db.String(100), nullable=False, unique=True)
    creation_date   = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"User(id = {self.user_id}, name = {self.username}, email = {self.email})"

# Controlling parameters required to be able to pass to the server
user_args = reqparse.RequestParser()
user_args.add_argument('username', type=str, required=True, help="Username cannot be blank")
user_args.add_argument('password', type=str, required=True, help="Password cannot be blank")
user_args.add_argument('email', type=str, required=True, help="Email cannot be blank")

# The information displayed in a GET method
userFields = {
    'user_id':fields.Integer,
    'username':fields.String,
    'creation_date':fields.DateTime
}

class UsersResource(Resource):
    # NOTE: GET
    # Turn the userFields into a JSON file
    @marshal_with(userFields) 
    def get(self):
        # Get all users from the db
        users = User.query.all()
        return users
    
    # NOTE: POST
    @marshal_with(userFields)
    def post(self):
        args = user_args.parse_args()
        pw_hash = generate_password_hash(args['password'])
        user = User(username=args['username'], password_hash=pw_hash, email=args['email'])
        db.session.add(user)
        db.session.commit()
        users = User.query.all()
        return users, 201 # Created

# Add an endpoint    
api.add_resource(UsersResource, "/api/users/")

class UserResource(Resource):
    # NOTE: GET ONE
    @marshal_with(userFields)
    def get(self, user_id):
        # Filter by the first user found by id
        user = User.query.filter_by(user_id=user_id).first()
        # If not found, abort
        if not user:
            abort(404, "User not found")
        # Else return the user
        return user
    
    # NOTE: UPDATE ONE
    @marshal_with(userFields)
    def patch(self, user_id):
        args = user_args.parse_args()
        user = User.query.filter_by(user_id=user_id).first()
        if not user:
            abort(404, "User not found")
        user.username = args['username']
        user.password = args['password']
        user.email = args['email']
        db.session.commit()
        return user
    
    # NOTE: DELETE ONE
    @marshal_with(userFields)
    def delete(self, user_id):
        args = user_args.parse_args()
        user = User.query.filter_by(user_id=user_id).first()
        if not user:
            abort(404, "User not found")
        db.session.delete(user)
        db.session.commit()
        users = User.query.all()
        return users, 204 # SUCCESS DELETE

api.add_resource(UserResource, "/api/users/<int:user_id>")

@app.route('/')
def home():
    return '<h1>Flask</h1>'


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
    
