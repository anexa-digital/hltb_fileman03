# backend/app/decryptor.py

from fastapi import FastAPI, UploadFile, File, HTTPException
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from base64 import b64decode
import hashlib
import os
from dotenv import load_dotenv

app = FastAPI()




env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(dotenv_path=env_path)

# Get variables from environment
SECRET_KEY = os.getenv("SECRET_KEY")

# Function to derive AES key from the password
def get_aes_key(password: str):
    return hashlib.sha256(password.encode()).digest()

@app.post("/api/decrypt")
async def decrypt_file(file: UploadFile = File(...), password: str = "default_password"):
    try:
        # Read encrypted file content
        encrypted_content = await file.read()

        # Decode the base64 content
        encrypted_content_bytes = b64decode(encrypted_content)

        # Derive AES key from password
        key = get_aes_key(password)

        # Decrypt the file using AES
        cipher = Cipher(algorithms.AES(key), modes.ECB(), backend=default_backend())
        decryptor = cipher.decryptor()
        decrypted_content = decryptor.update(encrypted_content_bytes) + decryptor.finalize()

        # Save the decrypted file
        decrypted_file_path = f"decrypted_{file.filename.replace('.enc', '')}"
        with open(decrypted_file_path, 'wb') as f:
            f.write(decrypted_content)

        return {"message": f"File decrypted successfully: {decrypted_file_path}"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
