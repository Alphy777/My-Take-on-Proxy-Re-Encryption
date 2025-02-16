import sqlite3
import os

# Get the absolute path of the parent directory (AEDA/)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DB_PATH = os.path.join(BASE_DIR, "users.db")  # Correct path

# Create or open the database
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# Create users table if it doesn’t exist
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
''')

conn.commit()
conn.close()
print(f"✅ Database created successfully at: {DB_PATH}")
