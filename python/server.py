from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import os
import bcrypt
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization

app = Flask(__name__, static_folder="../")
CORS(app)

DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "users.db"))

# Ensure database tables exist
def setup_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            public_key TEXT NOT NULL,
            private_key TEXT NOT NULL
        )
    ''')

    # Messages table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sender TEXT NOT NULL,
            receiver TEXT NOT NULL,
            message TEXT NOT NULL
        )
    ''')

    conn.commit()
    conn.close()

setup_db()

# Generate an RSA key pair
def generate_key_pair():
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
    )
    public_key = private_key.public_key()

    private_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption(),
    ).decode()

    public_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo,
    ).decode()

    return public_pem, private_pem

# Register a new user
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    public_key, private_key = generate_key_pair()

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO users (username, password, public_key, private_key) VALUES (?, ?, ?, ?)", 
                       (username, hashed_password, public_key, private_key))
        conn.commit()
        return jsonify({"status": "User registered successfully", "public_key": public_key})
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username already exists"}), 400
    finally:
        conn.close()

# User login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT password, private_key FROM users WHERE username=?", (username,))
    result = cursor.fetchone()

    if result and bcrypt.checkpw(password.encode(), result[0].encode()):
        return jsonify({"status": "success", "private_key": result[1], "redirect": "message.html"})
    else:
        return jsonify({"error": "Invalid username or password"}), 401

# Get public keys of all users
@app.route('/public-keys', methods=['GET'])
def get_public_keys():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT username, public_key FROM users")
    users = [{"username": row[0], "public_key": row[1]} for row in cursor.fetchall()]
    conn.close()
    return jsonify(users)

# Store an encrypted message
@app.route('/send-message', methods=['POST'])
def send_message():
    data = request.json
    sender = data.get("sender")
    receiver = data.get("receiver")
    message = data.get("message")

    if not sender or not receiver or not message:
        return jsonify({"error": "Missing fields"}), 400

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO messages (sender, receiver, message) VALUES (?, ?, ?)", 
                   (sender, receiver, message))
    conn.commit()
    conn.close()

    return jsonify({"status": "Message sent"})

# Fetch messages for a user
@app.route('/get-messages/<username>', methods=['GET'])
def get_messages(username):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT sender, message FROM messages WHERE receiver=?", (username,))
    messages = [{"sender": row[0], "message": row[1]} for row in cursor.fetchall()]
    conn.close()
    return jsonify(messages)

# Fetch active users
@app.route('/active-users', methods=['GET'])
def active_users():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT username FROM users")
    users = [row[0] for row in cursor.fetchall()]
    conn.close()
    return jsonify(users)

# Serve index.html
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, "index.html")

# Serve static files
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
