from flask import Blueprint, request, jsonify
import bcrypt
import pymysql
import requests
from config.db import get_db_connection

# Create the blueprint (think of it as a mini-app for auth routes)
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    chess_username = data.get('chess_username')

    # Enforce @iitk.ac.in email
    if not email or not email.endswith('@iitk.ac.in'):
        return jsonify({"error": "Access Denied: You must use a valid @iitk.ac.in email address."}), 400

    if not password or not chess_username:
        return jsonify({"error": "Password and Chess.com ID are required."}), 400



    # 2. Validate Chess.com ID
    # Chess.com requires a User-Agent header so they know who is pinging their API
    headers = {
        "User-Agent": "ChessClubIITK-Signup-App/1.0 (Contact: your_email@iitk.ac.in)"
    }
    chess_api_url = f"https://api.chess.com/pub/player/{chess_username.lower()}"
    
    try:
        chess_response = requests.get(chess_api_url, headers=headers, timeout=5)
        
        if chess_response.status_code == 404:
            # The API successfully responded, but the user doesn't exist
            return jsonify({"error": f"The Chess.com ID '{chess_username}' does not exist. Please check for typos."}), 400
        elif chess_response.status_code != 200:
            # Chess.com servers might be down or rate-limiting us
            print(f"Chess API Error: {chess_response.status_code}")
            return jsonify({"error": "Could not verify Chess.com ID right now. Please try again later."}), 502
            
    except requests.exceptions.RequestException as e:
        # Our server failed to connect to the internet/Chess.com entirely
        print(f"Chess API Connection Failed: {e}")
        return jsonify({"error": "Failed to connect to the verification server."}), 502
    # Hash the password
    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

    connection = None
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = """
                INSERT INTO users (email, chess_username, password_hash) 
                VALUES (%s, %s, %s)
            """
            cursor.execute(sql, (email, chess_username, password_hash))
            connection.commit()
            
            user_id = cursor.lastrowid
            
            return jsonify({
                "message": "Welcome to the Sanctum! Account created successfully.", 
                "userId": user_id
            }), 201

    except pymysql.err.IntegrityError as e:
        if e.args[0] == 1062:
            return jsonify({"error": "This email is already registered."}), 409
        return jsonify({"error": "Database integrity error."}), 500
        
    except Exception as e:
        print(f"Server Error: {e}")
        return jsonify({"error": "Internal server error."}), 500
        
    finally:
        if connection and connection.open:
            connection.close()