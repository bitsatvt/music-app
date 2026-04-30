from sqlalchemy import create_engine, MetaData, Table, insert, select, delete
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import and_, or_
import os

db_config = {
    'user': os.getenv("DB_USER"),
    'password': os.getenv("DB_PASSWORD"),
    'host': os.getenv("DB_HOST"),
    'database': os.getenv("DB_DATABASE")
}

DATABASE_URL = f"mysql+mysqlconnector://{db_config['user']}:{db_config['password']}@{db_config['host']}/{db_config['database']}"

engine = create_engine(DATABASE_URL, echo=False)
metadata = MetaData()

users_table = Table("users", metadata, autoload_with=engine)
friends_table = Table("friends", metadata, autoload_with=engine)
friend_requests_table = Table("friend_requests", metadata, autoload_with=engine)

def get_session():
    return Session(engine)

def send_friend_request(requester_id, receiver_id):
    session = get_session()
    try:
        # Check if a request already exists in either direction
        existing_request = session.execute(
            select(friend_requests_table).where(
                or_(
                    and_(
                        friend_requests_table.c.requester_id == requester_id,
                        friend_requests_table.c.receiver_id == receiver_id
                    ),
                    and_(
                        friend_requests_table.c.requester_id == receiver_id,
                        friend_requests_table.c.receiver_id == requester_id
                    )
                )
            )
        ).mappings().fetchone()
        
        if existing_request:
            return False

        # Check if already friends
        existing_friendship = session.execute(
            select(friends_table).where(
                or_(
                    and_(
                        friends_table.c.user_id == requester_id,
                        friends_table.c.friend_id == receiver_id
                    ),
                    and_(
                        friends_table.c.user_id == receiver_id,
                        friends_table.c.friend_id == requester_id
                    )
                )
            )
        ).mappings().fetchone()

        if existing_friendship:
            return False

        query = insert(friend_requests_table).values(
            requester_id=requester_id, receiver_id=receiver_id
        )
        session.execute(query)
        session.commit()
        return True
    except IntegrityError:
        session.rollback()
        return False
    finally:
        session.close()

def accept_friend_request(requester_id, receiver_id):
    session = get_session()
    try:
        # Insert one row representing the friendship
        session.execute(insert(friends_table).values(
            user_id=requester_id, friend_id=receiver_id
        ))

        # Remove the pending request
        session.execute(delete(friend_requests_table).where(
            and_(
                friend_requests_table.c.requester_id == requester_id,
                friend_requests_table.c.receiver_id == receiver_id
            )
        ))
        session.commit()
        return True
    except IntegrityError:
        session.rollback()
        return False
    finally:
        session.close()

def decline_friend_request(requester_id, receiver_id):
    session = get_session()
    try:
        query = delete(friend_requests_table).where(
            and_(
                friend_requests_table.c.requester_id == requester_id,
                friend_requests_table.c.receiver_id == receiver_id
            )
        )
        result = session.execute(query)
        session.commit()
        return result.rowcount > 0
    finally:        
        session.close()

'''
    Cancels an outgoing friend request sent by requester_id to receiver_id.
    Returns True if deleted, False if not found, None on DB error.
'''
def cancel_friend_request(requester_id, receiver_id):
    session = get_session()
    try:
        result = session.execute(
            delete(friend_requests_table).where(
                and_(
                    friend_requests_table.c.requester_id == requester_id,
                    friend_requests_table.c.receiver_id == receiver_id
                )
            )
        )
        session.commit()
        return result.rowcount > 0
    except Exception:
        session.rollback()
        return None
    finally:
        session.close()

'''
    Removes a friendship between two users, checking both row directions
    since the friendship may have been inserted in either order.
    Returns True if deleted, False if not found, and None on DB error.
'''
def remove_friend(user_id, friend_id):
    session = get_session()
    try:
        result = session.execute(
            delete(friends_table).where(
                or_(
                    and_(
                        friends_table.c.user_id == user_id,
                        friends_table.c.friend_id == friend_id
                    ),
                    and_(
                        friends_table.c.user_id == friend_id,
                        friends_table.c.friend_id == user_id
                    )
                )
            )
        )
        session.commit()
        return result.rowcount > 0
    except Exception:
        session.rollback()
        return None
    finally:
        session.close()


'''
Returns a list of friends for the given user, checking both directions
of the friendship row. Returns None on DB error, empty list if no friends.
'''
def get_friends_list(user_id):
    session = get_session()
    try:
        # Rows where this user is user_id - friend_id holds the friend's info
        as_requester = session.execute(
            select(
                users_table.c.user_id,
                users_table.c.username,
                friends_table.c.created_at
            ).join(
                friends_table, users_table.c.user_id == friends_table.c.friend_id
            ).where(friends_table.c.user_id == user_id)
        ).mappings().fetchall()

        # Rows where this user is friend_id - user_id holds the friend's info
        as_receiver = session.execute(
            select(
                users_table.c.user_id,
                users_table.c.username,
                friends_table.c.created_at
            ).join(
                friends_table, users_table.c.user_id == friends_table.c.user_id
            ).where(friends_table.c.friend_id == user_id)
        ).mappings().fetchall()

        return [dict(row) for row in as_requester] + [dict(row) for row in as_receiver]
    except Exception:
        return None
    finally:
        session.close()

'''
Returns incoming pending friend requests for the given user.
Returns None on DB error, dicts with empty lists if no requests.
'''
def get_incoming_pending_requests(user_id):
    session = get_session()
    try:
        incoming = session.execute(
            select(
                users_table.c.user_id,
                users_table.c.username,
                friend_requests_table.c.created_at
            ).join(
                friend_requests_table,
                users_table.c.user_id == friend_requests_table.c.requester_id
            ).where(friend_requests_table.c.receiver_id == user_id)
        ).mappings().all()
        return {
            "incoming": [dict(row) for row in incoming]
        }
    except Exception:
        return None
    finally:
        session.close()

'''
Returns outgoing pending friend requests for the given user.
Returns None on DB error, dicts with empty lists if no requests.
'''
def get_outgoing_pending_requests(user_id):
    session = get_session()
    try:
        outgoing = session.execute(
            select(
                users_table.c.user_id,
                users_table.c.username,
                friend_requests_table.c.created_at
            ).join(
                friend_requests_table,
                users_table.c.user_id == friend_requests_table.c.receiver_id
            ).where(friend_requests_table.c.requester_id == user_id)
        ).mappings().all()
 
        return {
            "outgoing": [dict(row) for row in outgoing]
        }
    except Exception:
        return None
    finally:
        session.close()
 
'''
    Returns the relationship status between two users:
      'friends'          — they are friends
      'request_sent'     — user_id sent a request to other_id
      'request_received' — other_id sent a request to user_id
      'none'             — no relationship
      None               — DB error
'''
def get_friend_status(user_id, other_id):
    session = get_session()
    try:
        friendship = session.execute(
            select(friends_table).where(
                or_(
                    and_(
                        friends_table.c.user_id == user_id,
                        friends_table.c.friend_id == other_id
                    ),
                    and_(
                        friends_table.c.user_id == other_id,
                        friends_table.c.friend_id == user_id
                    )
                )
            )
        ).mappings().fetchone()
 
        if friendship:
            return "friends"
 
        request = session.execute(
            select(friend_requests_table).where(
                or_(
                    and_(
                        friend_requests_table.c.requester_id == user_id,
                        friend_requests_table.c.receiver_id == other_id
                    ),
                    and_(
                        friend_requests_table.c.requester_id == other_id,
                        friend_requests_table.c.receiver_id == user_id
                    )
                )
            )
        ).mappings().fetchone()
 
        if request:
            if request["requester_id"] == int(user_id):
                return "request_sent"
            return "request_received"
 
        return "none"
    except Exception:
        return None
    finally:
        session.close()
