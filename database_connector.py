import mysql.connector
from mysql.connector import Error, IntegrityError

db_config = {
    'user': 'uddin',
    'password': 'BITSMusicAppSecretPassword',
    'host': 'localhost',
    'database': 'music_app_db'
}


def get_connection():
    try:
        cnx = mysql.connector.connect(**db_config)
        return cnx
    except Error as err:
        print(f"Failed to connect to database: {err}")
        return None


def sign_up(user, password, email):
    cnx = get_connection()
    if not cnx:
        return False
    try:
        with cnx.cursor() as cursor:
            query = "INSERT INTO users (username, password_hash, email) VALUES (%s, %s, %s)"
            cursor.execute(query, (user, password, email))
            cnx.commit()
            print_users()
            print("Sign Up Successful!")
            cnx.close()
            return True
    except IntegrityError as err:
        if err.errno == 1062:
            print("Username or email already exists.")
        else:
            print(f"Integrity error: {err}")
        cnx.rollback()
    finally:
        if cnx.is_connected():
            cnx.close()
    return False


def print_users():
    cnx = get_connection()
    if not cnx:
        return False
   
    if cnx and cnx.is_connected():
        with cnx.cursor() as cursor:
            result = cursor.execute("SELECT * FROM users")
            rows = cursor.fetchall()
            for row in rows:
                print(row)
        cnx.close()
        return True
    else:
        print("Failed")
    return False