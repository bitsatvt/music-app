from flask import Blueprint, request, jsonify
from .friend_db import *
from flask_jwt_extended import jwt_required, get_jwt_identity
from dotenv import load_dotenv

friends = Blueprint("friends", __name__)

'''
    Endpoint for sending a friend request to another user,
    returns a msg stating if the request was sent successfully
'''
@friends.post('/friend_request')
@jwt_required()
def send_request():
    data = request.json
    if not data or "receiver_id" not in data:
        return jsonify({"Error": "Request body is missing or invalid"}), 400

    requester_id = get_jwt_identity()
    receiver_id = data["receiver_id"]

    if int(requester_id) == int(receiver_id):
        return jsonify({"Error": "You cannot send a friend request to yourself"}), 400

    success = send_friend_request(requester_id, receiver_id)
    if not success:
        return jsonify({"Error": "Failed to send friend request, request may already exist or the user may not exist"}), 400
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

'''
    Endpoint for cancelling an outgoing friend request.
    Returns 200 on success, 404 if the request does not exist,
    500 on a database error.
'''
@friends.delete('/cancel_request')
@jwt_required()
def cancel_request():
    data = request.json
    requester_id = get_jwt_identity()
    receiver_id = data["receiver_id"]
 
    result = cancel_friend_request(requester_id, receiver_id)
 
    if result is None:
        return jsonify({"Error": "Failed to cancel friend request"}), 500
    if not result:
        return jsonify({"Error": "Friend request not found"}), 404
    return jsonify({"Message": "Friend request cancelled successfully!"}), 200

'''
    Endpoint for unfriending a user,
    returns a msg stating whether the unfriend was successful
    Returns 200 on success, 404 if the friendship does not exist,
    500 on DB error
'''
@friends.delete('/remove_friend')
@jwt_required()
def remove_friend_endpoint():
    data = request.json
    user_id = get_jwt_identity()
    friend_id = data["friend_id"]
 
    if int(user_id) == int(friend_id):
        return jsonify({"Error": "user_id shouldn't equal friend_id; there's a bug in the code"}), 400
 
    result = remove_friend(user_id, friend_id)
 
    if result is None:
        return jsonify({"Error": "Failed to remove friend"}), 500
    if not result:
        return jsonify({"Error": "Friendship not found"}), 404
    return jsonify({"Message": "Friend removed successfully!"}), 200


'''
    Endpoint for retrieving the current user's outgoing pending friend requests.
    Returns outgoing (user -> others)
    Returns 200 with empty lists if there are no pending requests,
    500 on a database error.
'''
@friends.get('/outgoing_pending_requests')
@jwt_required()
def outgoing_pending_requests():
    user_id = get_jwt_identity()
    requests = get_outgoing_pending_requests(user_id)
 
    if requests is None:
        return jsonify({"Error": "Failed to retrieve pending friend requests"}), 500
 
    outgoing = requests["outgoing"]
 
    if len(outgoing) == 0:
        return jsonify({"Message": "No outgoing friend requests", "Requests": {"outgoing": []}}), 200
 
    return jsonify({
        "Message": "Pending friend requests retrieved successfully!",
        "Requests": {
            "outgoing": [{"user_id": req["user_id"], "username": req["username"]} for req in outgoing]
        }
    }), 200

'''
    Endpoint for retrieving the current user's incoming pending friend requests.
    Returns incoming (others -> user)
    Returns 200 with empty lists if there are no pending requests,
    500 on a database error.
'''
@friends.get('/incoming_pending_requests')
@jwt_required()
def incoming_pending_request():
    user_id = get_jwt_identity()
    requests = get_incoming_pending_requests(user_id)
 
    if requests is None:
        return jsonify({"Error": "Failed to retrieve pending friend requests"}), 500
 
    incoming = requests["incoming"]
 
    if len(incoming) == 0:
        return jsonify({"Message": "No pending friend requests", "Requests": {"incoming": []}}), 200
 
    return jsonify({
        "Message": "Pending friend requests retrieved successfully!",
        "Requests": {
            "incoming": [{"user_id": req["user_id"], "username": req["username"]} for req in incoming]
        }
    }), 200

'''
    Endpoint for retrieving the current user's friends list.
    Returns 200 with an empty list if the user has no friends,
    500 on a database error.
'''
@friends.get('/friends_list')
@jwt_required()
def friends_list():
    user_id = get_jwt_identity()
    friends = get_friends_list(user_id)
 
    if friends is None:
        return jsonify({"Error": "Failed to retrieve friends list"}), 500
    if len(friends) == 0:
        return jsonify({"Message": "User has no friends yet", "Friends": []}), 200
 
    return jsonify({
        "Message": "Friends list retrieved successfully!",
        "Friends": [{"user_id": friend["user_id"], "username": friend["username"]} for friend in friends]
    }), 200
 
'''
    Endpoint for checking the relationship status between the logged in user
    and another user. Returns one of: friends, request_sent, request_received, none.
    500 on a database error.
'''
@friends.get('/friend_status/<int:other_id>')
@jwt_required()
def friend_status(other_id):
    user_id = get_jwt_identity()
 
    if int(user_id) == int(other_id):
        return jsonify({"Error": "Invalid request"}), 400
 
    status = get_friend_status(user_id, other_id)
 
    if status is None:
        return jsonify({"Error": "Failed to retrieve friend status"}), 500
    return jsonify({"Message": "Friend status retrieved successfully!", "Status": status}), 200