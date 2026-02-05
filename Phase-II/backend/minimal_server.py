from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from pydantic import EmailStr
import sqlite3
import json

app = FastAPI()

# Simple in-memory storage for testing
users_db = []

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

@app.post("/api/v1/auth/register", response_model=Token)
async def register(user_data: UserCreate):
    try:
        print(f"Received registration request for: {user_data.email}")
        
        # Check if user already exists
        for user in users_db:
            if user['email'] == user_data.email:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered"
                )
        
        # Add user to our "database"
        new_user = {
            "id": str(len(users_db) + 1),
            "name": user_data.name,
            "email": user_data.email,
            "password_hash": f"hashed_{user_data.password}"  # Simplified
        }
        users_db.append(new_user)
        
        print(f"User registered successfully: {new_user['email']}")
        
        # Return fake tokens
        return {
            "access_token": f"fake_access_token_for_{user_data.email}",
            "refresh_token": f"fake_refresh_token_for_{user_data.email}",
            "token_type": "bearer"
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in register: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Registration failed: {str(e)}"
        )

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)