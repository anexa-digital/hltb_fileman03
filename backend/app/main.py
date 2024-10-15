from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import os

from starlette.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Secure FileManager App",          # The name of your FastAPI app
    description="Secure FileManager App",  # A short description of the app
    version="1.0.0"                  # The version of the app
)


# Directory to store uploaded files
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Enable CORS for the frontend's origin (localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)


# Endpoint to read file names from the UPLOAD_FOLDER
@app.get("/api/files")
async def get_uploaded_files():
    try:
        # List all files in the UPLOAD_FOLDER
        files = os.listdir(UPLOAD_FOLDER)
        
        if not files:
            return JSONResponse(content={"message": "No files found"}, status_code=200)

        return JSONResponse(content={"files": files}, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")




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
