import sqlite3
import base64
import datetime

DATABASE_NAME = 'predictions.db'


def init_db():
    try:
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
    except sqlite3.Error as e:
        print(f"Database error in init_db: {e}")


def save_prediction(image_bytes, breed, confidence):
    try:
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')
        timestamp = datetime.datetime.now().isoformat()
        with sqlite3.connect(DATABASE_NAME) as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO predictions (image_base64, breed, confidence, timestamp) VALUES (?, ?, ?, ?)",
                (image_base64, breed, confidence, timestamp)
            )
            conn.commit()
    except sqlite3.Error as e:
        print(f"Database error in save_prediction: {e}")
    except Exception as e:
        print(f"Error in save_prediction: {e}")


def get_predictions():
    try:
        with sqlite3.connect(DATABASE_NAME) as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT id, image_base64, breed, confidence, timestamp FROM predictions ORDER BY timestamp DESC"
            )
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
    except sqlite3.Error as e:
        print(f"Database error in get_predictions: {e}")
        return []
    except Exception as e:
        print(f"Error in get_predictions: {e}")
        return []


def get_predictions_count():
    try:
        with sqlite3.connect(DATABASE_NAME) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM predictions")
            count = cursor.fetchone()[0]
            return count
    except sqlite3.Error as e:
        print(f"Database error in get_predictions_count: {e}")
        return 0

if __name__ == '__main__':
    init_db()
    print("Database initialized and table 'predictions' created.")
