# src/app.py
from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging
import os
from datetime import datetime
from typing import List

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(title="File Service")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create upload directories if they don't exist
UPLOAD_DIR = "upload"
IMAGE_DIR = os.path.join(UPLOAD_DIR, "images")
PDF_DIR = os.path.join(UPLOAD_DIR, "pdfs")

os.makedirs(IMAGE_DIR, exist_ok=True)
os.makedirs(PDF_DIR, exist_ok=True)

# Allowed file extensions
ALLOWED_IMAGE_TYPES = [".jpg", ".jpeg", ".png", ".gif"]
ALLOWED_PDF_TYPES = [".pdf"]

@app.post("/upload/image")
async def upload_image(file: UploadFile):
    logger.info(f"Received image upload request for file: {file.filename}")
    
    # Validate file extension
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in ALLOWED_IMAGE_TYPES:
        logger.error(f"Invalid image type: {file_ext}")
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed types: {', '.join(ALLOWED_IMAGE_TYPES)}"
        )
    
    try:
        # Create unique filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        new_filename = f"{timestamp}_{file.filename}"
        file_path = os.path.join(IMAGE_DIR, new_filename)
        
        # Save the file
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        logger.info(f"Successfully saved image: {new_filename}")
        return {"filename": new_filename, "path": file_path}
    
    except Exception as e:
        logger.error(f"Error saving image: {str(e)}")
        raise HTTPException(status_code=500, detail="Error uploading file")

@app.post("/upload/pdf")
async def upload_pdf(file: UploadFile):
    logger.info(f"Received PDF upload request for file: {file.filename}")
    
    # Validate file extension
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in ALLOWED_PDF_TYPES:
        logger.error(f"Invalid PDF type: {file_ext}")
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed types: {', '.join(ALLOWED_PDF_TYPES)}"
        )
    
    try:
        # Create unique filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        new_filename = f"{timestamp}_{file.filename}"
        file_path = os.path.join(PDF_DIR, new_filename)
        
        # Save the file
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        logger.info(f"Successfully saved PDF: {new_filename}")
        return {"filename": new_filename, "path": file_path}
    
    except Exception as e:
        logger.error(f"Error saving PDF: {str(e)}")
        raise HTTPException(status_code=500, detail="Error uploading file")

@app.get("/")
async def root():
    return {"message": "File Service is running"}

# Handle not found routes
@app.exception_handler(404)
async def custom_404_handler(request, exc):
    return {"detail": "Route not found"}