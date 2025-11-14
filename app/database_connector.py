from sqlalchemy import create_engine, MetaData, Table, insert, select, delete, update
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
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

users_table = Table("users", metadata, autoload_with=engine)

def get_session():
    return Session(engine)

def sign_up(user, password, email):
    session = get_session()
    try:
        query = insert(users_table).values(username=user, password_hash=password, email=email)
        session.execute(query)
        session.commit()
        return get_user(user, password)
    except IntegrityError:
        session.rollback()
        return None
    finally:
        session.close()

def get_user(user, password):
    session = get_session()
    try:
        query = select(users_table).where(users_table.c.username == user, users_table.c.password_hash == password)
        result = session.execute(query).mappings().fetchone()
        return result if result else None
    finally:
        session.close()

def get_user_by_id(user_id):
    session = get_session()
    try:
        query = select(users_table).where(users_table.c.user_id == user_id)
        result = session.execute(query).mappings().fetchone()
        return result if result else None
    finally:
        session.close()

def delete_user(user, password):
    session = get_session()
    try:
        query = delete(users_table).where(users_table.c.username == user, users_table.c.password_hash == password)
        result = session.execute(query)
        session.commit()
        return result.rowcount > 0
    finally:
        session.close()

def update_username(old_user, new_user):
    session = get_session()
    try:
        query = update(users_table).where(users_table.c.username == old_user).values(username=new_user)
        result = session.execute(query)
        if result.rowcount == 0:
            session.rollback()
            return "user_not_found"
        session.commit()
        return "success"
    except IntegrityError:
        session.rollback()
        return "new_username_exists"
    finally:
        session.close()

def update_password(username, old_password, new_password):
    session = get_session()
    try:
        query = update(users_table).where(users_table.c.username == username, users_table.c.password_hash == old_password).values(password_hash=new_password)
        result = session.execute(query)
        session.commit()
        return result.rowcount > 0
    except Exception:
        session.rollback()
        return False
    finally:
        session.close()

def get_all_users():
    session = get_session()
    try:
        query = select(users_table)
        result = session.execute(query).mappings().all()
        return result if result else None
    finally:
        session.close()