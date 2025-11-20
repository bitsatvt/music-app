from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

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


class ScoreBoard(db.Model):
    __tablename__   = "scoreboard"
    id              = db.Column(db.Integer, primary_key=True)
    quiz_id         = db.Column(db.Integer, nullable=False)
    user_id         = db.Column(db.BigInteger, nullable=False)
    score           = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"ScoreBoard(quiz_id = {self.quiz_id}, user_id = {self.user_id}, score = {self.score})"
   
