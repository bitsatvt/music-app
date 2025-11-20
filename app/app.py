from flask import Flask, request, jsonify
from datetime import datetime
from models import db, User, ScoreBoard
from sqlalchemy import func

app = Flask(__name__)

# CONFIGRING CONNECTION TO THE DATABASE
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:hung25032007@localhost/music_app_db'
app.config['SECRET_KEY'] = 'supersecretkeymusicapp'

# Initualize db with this app
db.init_app(app)


# Main page
@app.route('/')
def home():
    return jsonify({"status": "ok"}) # Health check

# Get all scores in a formatted json string
@app.route('/api/scoreboard', methods=["GET"])
def get_scoreboard():
    # Get the scoreboard
    query = ScoreBoard.query

    # Json should pass in user_id and quiz_id
    user_id = request.args.get('user_id', type=int)
    quiz_id = request.args.get('quiz_id', type=int)

    # Both are required
    if user_id is not None:
        query = query.filter_by(user_id=user_id)
    if quiz_id is not None:
        query = query.filter_by(quiz_id=quiz_id)

    rows = query.all()

    data = [
        {
            "quiz_id": row.quiz_id,
            "user_id": row.user_id,
            "score": row.score,
        }
        for row in rows
    ]

    return jsonify({
        "count": len(data),
        "results":data,
    })

# Add a new attempt
@app.route('/api/scoreboard', methods=['POST'])
def add_score():
    """
    Expected JSON body:
    {
        "quiz_id": 1,
        "user_id": 42,
        "score": 95
    }
    """
    data = request.get_json() or {}

    quiz_id = data.get("quiz_id")
    user_id = data.get("user_id")
    score = data.get("score")

    # Basic value check
    if quiz_id is None or user_id is None or score is None:
        return jsonify({
            "error": "quiz_id, user_id, and score are required"
        }), 400
    
    # Case to int and catch errors
    try:
        quiz_id = int(quiz_id)
        user_id = int(user_id)
        score = int(score)
    except ValueError:
        return jsonify({"error": "quiz_id, user_id, and score must be integers"}), 400
    
    new_row = ScoreBoard(
        quiz_id=quiz_id,
        user_id=user_id,
        score=score
    )

    db.session.add(new_row)
    db.session.commit()

    return jsonify({
        "quiz_id": quiz_id,
        "user_id": user_id,
        "score": score,
        "status": "saved successfully"
    }), 201

# Get average points of specific user of specific quiz
def get_user_quiz_average(user_id: int, quiz_id: int):
    """Return (average_score) for this user and quiz"""
    avg_score = (
        db.session.query(func.avg(ScoreBoard.score))
        .filter(
            ScoreBoard.user_id == user_id,
            ScoreBoard.quiz_id == quiz_id
        )
        .scalar()
    )
    
    return avg_score

@app.route('/api/scoreboard/average', methods=["GET"])
def get_average_score():
    data = request.get_json() or {}

    user_id = data.get('user_id')
    quiz_id = data.get('quiz_id')

    try:
        user_id = int(user_id)
        quiz_id = int(quiz_id)
    except ValueError:
        return jsonify({
            "error": "user_id and quiz_id are integers"
        })

    if user_id is None or quiz_id is None:
        return jsonify({
            "error": "user_id and quiz_id are required"
        }), 400
    
    avg_score = get_user_quiz_average(user_id=user_id, quiz_id=quiz_id)

    if avg_score is None:
        return jsonify({
            "user_id": user_id,
            "quiz_id": quiz_id,
            "average_score": None,
            "message": "No attempts found for this user and quiz"
        }), 200
    
    avg_score_rounded = round(float(avg_score), 2)

    return jsonify({
        "user_id": user_id,
        "quiz_id": quiz_id,
        "average_score": avg_score_rounded
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
    
