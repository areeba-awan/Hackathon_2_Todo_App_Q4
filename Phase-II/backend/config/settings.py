from pydantic_settings import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    # Database settings
    DATABASE_URL: str = "sqlite:///./todo_app.db"  # Use relative path for Hugging Face compatibility

    # Auth settings
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60  # 1 hour
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7  # 7 days

    # Application settings
    PROJECT_NAME: str = "Todo Backend API"
    API_V1_STR: str = "/api/v1"

    # Frontend URL for CORS (in production, set this properly)
    FRONTEND_URL: str = "http://localhost:3000"

    class Config:
        env_file = ".env"
        extra = "allow"  # Allow extra fields from .env file


settings = Settings()