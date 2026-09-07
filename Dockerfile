FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the ENTIRE project folder (including the frontend folder)
COPY . .

# Change to the backend folder to run the server
WORKDIR /app/backend

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:10000", "main:app"]