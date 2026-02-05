"""
Debug endpoints for troubleshooting authentication issues
"""
from fastapi import APIRouter, Depends, HTTPException, Header, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional
from backend.utils.security import verify_token
from backend.config.settings import settings
from backend.services.auth import create_user
from backend.schemas.user import UserCreate
import logging
import json

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/debug", tags=["Debug"])

# HTTPBearer without auto_error to get raw credentials
security = HTTPBearer(auto_error=False)


@router.get("/auth-headers")
async def debug_auth_headers(
    authorization: Optional[str] = Header(None),
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
):
    """Debug endpoint to inspect authorization headers"""
    return {
        "raw_auth_header": authorization,
        "parsed_credentials": {
            "scheme": credentials.scheme if credentials else None,
            "credentials": credentials.credentials[:20] + "..." if credentials and credentials.credentials else None,
        }
    }


@router.post("/verify-token")
async def debug_verify_token(token: dict):
    """Debug endpoint to verify a token"""
    token_str = token.get("token", "")
    
    logger.info(f"Debug: Verifying token: {token_str[:30]}...")
    logger.info(f"Debug: SECRET_KEY: {settings.SECRET_KEY[:10]}...")
    logger.info(f"Debug: ALGORITHM: {settings.ALGORITHM}")
    
    if not token_str:
        return {"error": "No token provided"}
    
    payload = verify_token(token_str)
    
    return {
        "token_provided": True,
        "token_first_30_chars": token_str[:30],
        "payload": payload,
        "verification_success": payload is not None,
    }


@router.get("/settings")
async def debug_settings():
    """Debug endpoint to check settings"""
    return {
        "database_url": settings.DATABASE_URL,
        "algorithm": settings.ALGORITHM,
        "access_token_expire_minutes": settings.ACCESS_TOKEN_EXPIRE_MINUTES,
        "refresh_token_expire_days": settings.REFRESH_TOKEN_EXPIRE_DAYS,
        "secret_key_length": len(settings.SECRET_KEY),
        "secret_key_first_10_chars": settings.SECRET_KEY[:10],
    }


@router.post("/seed-test-data")
async def seed_test_data():
    """Seed database with test data"""
    try:
        test_users = [
            {
                "email": "test@example.com",
                "password": "Test@123456",
                "name": "Test User"
            },
            {
                "email": "demo@example.com",
                "password": "Demo@123456",
                "name": "Demo User"
            },
            {
                "email": "user@example.com",
                "password": "User@123456",
                "name": "Example User"
            }
        ]
        
        created_users = []
        failed_users = []
        
        for user_data in test_users:
            try:
                logger.info(f"Creating test user: {user_data['email']}")
                user_create = UserCreate(
                    email=user_data["email"],
                    password=user_data["password"],
                    name=user_data["name"]
                )
                created_user = await create_user(user_create)
                created_users.append({
                    "email": created_user.email,
                    "id": created_user.id,
                    "status": "created"
                })
                logger.info(f"Test user created: {created_user.email}")
            except HTTPException as e:
                if "already registered" in str(e.detail):
                    logger.info(f"User already exists: {user_data['email']}")
                    failed_users.append({
                        "email": user_data["email"],
                        "status": "already_exists"
                    })
                else:
                    logger.error(f"Failed to create user {user_data['email']}: {e.detail}")
                    failed_users.append({
                        "email": user_data["email"],
                        "status": "error",
                        "error": str(e.detail)
                    })
            except Exception as e:
                logger.error(f"Unexpected error creating user {user_data['email']}: {e}")
                failed_users.append({
                    "email": user_data["email"],
                    "status": "error",
                    "error": str(e)
                })
        
        return {
            "message": "Database seeding completed",
            "created": created_users,
            "failed": failed_users,
            "total_attempted": len(test_users),
            "total_created": len(created_users),
            "credentials": {
                "email": "test@example.com",
                "password": "Test@123456"
            }
        }
    except Exception as e:
        logger.error(f"Error seeding database: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error seeding database: {str(e)}"
        )
