# Dockerfile
FROM python:3.11-slim

WORKDIR /usr/src/app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Create upload directories
RUN mkdir -p upload/images upload/pdfs

# Command to run the application
CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "8082", "--reload"]