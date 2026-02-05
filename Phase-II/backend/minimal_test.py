from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from pydantic import EmailStr

app = FastAPI()

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

@app.post("/api/v1/register", response_model=Token)
async def register(user_data: UserCreate):
    print(f"Received registration request for: {user_data.email}")
    return {
        "access_token": "test_access_token",
        "refresh_token": "test_refresh_token",
        "token_type": "bearer"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8005)