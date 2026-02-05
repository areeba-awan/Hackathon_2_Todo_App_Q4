from sqlmodel import SQLModel
from typing import Optional
from pydantic import BaseModel, EmailStr, validator


class UserBase(SQLModel):
    email: EmailStr
    name: Optional[str] = None


class UserCreate(UserBase):
    password: str

    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v


class UserUpdate(SQLModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None


class UserRead(UserBase):
    id: str


class UserLogin(SQLModel):
    email: EmailStr
    password: str


class Token(SQLModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenData(SQLModel):
    email: Optional[str] = None