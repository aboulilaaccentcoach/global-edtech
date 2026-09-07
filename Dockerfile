FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project (including frontend) into /app
COPY . .

# Set the working directory to the backend folder
WORKDIR /app/backend

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:10000", "main:app"]
