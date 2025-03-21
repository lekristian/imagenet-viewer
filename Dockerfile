FROM python:3.9-slim

# Set a working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your project files (or rely on volumes if you prefer)
# COPY parse_and_store.py .
# COPY imagenet.xml .
# COPY wait_for_db.py .

# By default, the container will just run bash if you override it in docker-compose
CMD ["/bin/bash"]
