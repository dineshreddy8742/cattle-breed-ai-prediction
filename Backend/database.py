import sqlite3
import base64
import datetime

DATABASE_NAME = 'predictions.db'

def init_db():
    with sqlite3.connect(DATABASE_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS predictions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image_base64 TEXT NOT NULL,
                breed TEXT NOT NULL,
                confidence REAL NOT NULL,
                timestamp TEXT NOT NULL
            )
        """)
        conn.commit()

def save_prediction(image_bytes, breed, confidence):
    image_base64 = base64.b64encode(image_bytes).decode('utf-8')
    timestamp = datetime.datetime.now().isoformat()
    with sqlite3.connect(DATABASE_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO predictions (image_base64, breed, confidence, timestamp) VALUES (?, ?, ?, ?)",
            (image_base64, breed, confidence, timestamp)
        )
        conn.commit()

def get_predictions():
    with sqlite3.connect(DATABASE_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, image_base64, breed, confidence, timestamp FROM predictions ORDER BY timestamp DESC")
        rows = cursor.fetchall()
        predictions = []
        for row in rows:
            predictions.append({
                'id': row[0],
                'image_base64': row[1],
                'breed': row[2],
                'confidence': row[3],
                'timestamp': row[4]
            })
        return predictions

if __name__ == '__main__':
    init_db()
    print("Database initialized and table 'predictions' created.")
