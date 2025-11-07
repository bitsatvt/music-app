from sqlalchemy import create_engine, MetaData, Table, insert, select
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

db_config = {
    'user': 'uddin',
    'password': 'BITSMusicAppSecretPassword',
    'host': 'localhost',
    'database': 'music_app_db'
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
        print("Sign Up Successful!")
        return True
    except IntegrityError:
        session.rollback()
        return False
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
