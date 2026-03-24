from sqlalchemy import create_engine, MetaData, Table, insert, select, delete
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import and_, or_
from dotenv import load_dotenv
import os

load_dotenv()

db_config = {
    'user': os.getenv("DB_USER"),
    'password': os.getenv("DB_PASSWORD"),
    'host': os.getenv("DB_HOST"),
    'database': os.getenv("DB_DATABASE")
}

DATABASE_URL = f"mysql+mysqlconnector://{db_config['user']}:{db_config['password']}@{db_config['host']}/{db_config['database']}"

engine = create_engine(DATABASE_URL, echo=False)
metadata = MetaData()

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