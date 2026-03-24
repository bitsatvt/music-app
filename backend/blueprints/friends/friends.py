from flask import Blueprint, request, jsonify
from .friend_db import *
from flask_jwt_extended import jwt_required, get_jwt_identity
from dotenv import load_dotenv

load_dotenv()

friends = Blueprint("friends", __name__)

'''
    Endpoint for sending a friend request to another user,
    returns a msg stating if the request was sent successfully
'''
@friends.post('/friend_request')
@jwt_required()
def send_request():
    data = request.json
    requester_id = get_jwt_identity()
    receiver_id = data["receiver_id"]

    if requester_id == receiver_id:
        return jsonify({"Error": "You cannot send a friend request to yourself"}), 400

    success = send_friend_request(requester_id, receiver_id)
    if not success:
        return jsonify({"Error": "Failed to send friend request, request may already exist"}), 400
    return jsonify({"Message": "Friend request sent sucessfully!"}), 201

'''
    Endpoint for accepting a friend request,
    returns a msg stating whether the request was accepted successfully
'''
@friends.post('/accept_request')
@jwt_required()
def accept_request():
    data = request.json
    receiver_id = get_jwt_identity()
    requester_id = data["requester_id"]

    success = accept_friend_request(requester_id, receiver_id)
    if not success:
        return jsonify({"Error": "Failed to accept friend request, request may not exist"}), 400
    return jsonify({"Message": "Friend request accepted sucessfully!"}), 200

'''
    Endpoint for declining a friend request,
    returns a msg stating whether the request was declined successfully
'''
@friends.post('/decline_request')
@jwt_required()
def decline_request():
    data = request.json
    receiver_id = get_jwt_identity()
    requester_id = data["requester_id"]

    success = decline_friend_request(requester_id, receiver_id)
    if not success:
        return jsonify({"Error": "Failed to decline friend request, request may not exist"}), 400
    return jsonify({"Message": "Friend request declined!"}), 200