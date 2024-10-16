# Use the official Python image from Docker Hub
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . .

# Expose the port that FastAPI will run on
EXPOSE 8000

# Command to run the FastAPI app with Uvicorn and SSL
#CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--ssl-keyfile", "./desktop-ks0con1-key.pem", "--ssl-certfile", "./desktop-ks0con1-cert.pem"]
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

