# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import sqlite3
# import bcrypt
# import os

# app = Flask(__name__)
# CORS(app)

# DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "users.db"))

# # ✅ Fetch all registered users
# @app.route('/admin/users', methods=['GET'])
# def get_users():
#     conn = sqlite3.connect(DB_PATH)
#     cursor = conn.cursor()
#     cursor.execute("SELECT username FROM users")
#     users = [row[0] for row in cursor.fetchall()]
#     conn.close()
#     return jsonify(users)

# # ✅ Add a new user (Admin-only action)
# @app.route('/admin/add-user', methods=['POST'])
# def add_user():
#     data = request.json
#     username = data.get("username")
#     password = data.get("password")

#     if not username or not password:
#         return jsonify({"error": "Username and password are required"}), 400

#     hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

#     conn = sqlite3.connect(DB_PATH)
#     cursor = conn.cursor()
#     try:
#         cursor.execute("INSERT INTO users (username, password, is_online) VALUES (?, ?, 0)", 
#                        (username, hashed_password))
#         conn.commit()
#         return jsonify({"status": "User added successfully"})
#     except sqlite3.IntegrityError:
#         return jsonify({"error": "Username already exists"}), 400
#     finally:
#         conn.close()

# # ✅ Remove a user (Admin-only action)
# @app.route('/admin/remove-user', methods=['POST'])
# def remove_user():
#     data = request.json
#     username = data.get("username")

#     if not username:
#         return jsonify({"error": "Username is required"}), 400

#     conn = sqlite3.connect(DB_PATH)
#     cursor = conn.cursor()
#     cursor.execute("DELETE FROM users WHERE username=?", (username,))
#     conn.commit()
#     conn.close()

#     return jsonify({"status": f"User {username} removed successfully"})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0',port=5001)  # Running on a different port (5001)
