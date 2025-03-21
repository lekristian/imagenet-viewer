import os
import time
import psycopg2

DB_NAME = os.getenv('POSTGRES_DB', 'my_db')
DB_USER = os.getenv('POSTGRES_USER', 'my_user')
DB_PASS = os.getenv('POSTGRES_PASSWORD', 'my_password')
DB_HOST = os.getenv('DB_HOST', 'db')
DB_PORT = os.getenv('DB_PORT', '5432')

# Attempt connection with retries
max_retries = 10
for attempt in range(1, max_retries + 1):
    try:
        conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS,
                                host=DB_HOST, port=DB_PORT)
        conn.close()
        print("Database is ready!")
        break
    except psycopg2.OperationalError:
        print(f"DB not ready, attempt {attempt}/{max_retries}...")
        time.sleep(3)
else:
    raise Exception("Could not connect to the database after several retries.")
