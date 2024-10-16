import uuid
from datetime import datetime

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import os

from starlette.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Gestor de Archivos",          # The name of your FastAPI app
    description="Gestor de Archivos",  # A short description of the app
    version="1.0.0"                  # The version of the app
)


# Directory to store uploaded files
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Enable CORS for the frontend's origin (localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://localhost:8000",
        "https://localhost:3000",
        "http://localhost:8000",
        "http://localhost:3000",
        "https://ws-ponal.heliteb.co",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Endpoint to get list of files with ID, name, and modified date
@app.get("/api/files")
async def get_files():
    try:
        files = []
        for file_name in os.listdir(UPLOAD_FOLDER):
            file_path = os.path.join(UPLOAD_FOLDER, file_name)
            if os.path.isfile(file_path):
                file_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, file_name))  # Generate consistent UUID based on file name
                modified_time = datetime.fromtimestamp(os.path.getmtime(file_path))
                files.append({
                    "id": file_id,
                    "name": file_name,
                    "modified_time": modified_time.strftime('%Y-%m-%d %H:%M:%S')
                })
        return {"files": files}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# Endpoint to delete a file by name
@app.delete("/api/files/{file_name}")
async def delete_file(file_name: str):
    file_path = os.path.join(UPLOAD_FOLDER, file_name)
    if os.path.exists(file_path):
        os.remove(file_path)
        return {"message": f"File '{file_name}' has been deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="File not found")

# API Endpoint to handle file upload
@app.post("/api/files")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Save the uploaded file to the UPLOAD_FOLDER
        file_location = os.path.join(UPLOAD_FOLDER, file.filename)
        with open(file_location, "wb") as f:
            f.write(await file.read())

        return JSONResponse(content={"message": f"File '{file.filename}' uploaded successfully"}, status_code=200)

    except Exception as e:
        return JSONResponse(content={"message": f"Error: {str(e)}"}, status_code=500)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
