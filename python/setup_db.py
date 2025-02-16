import sqlite3
import os

# Define database path inside the main folder (Proxy Re-Encryption/)
DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "users.db"))

# Create or open the database
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# ✅ Ensure `users` table has all required columns
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        is_online INTEGER DEFAULT 0  -- 0 = Offline, 1 = Online
    )
''')

conn.commit()
conn.close()
print(f"✅ Database created successfully at: {DB_PATH}")
