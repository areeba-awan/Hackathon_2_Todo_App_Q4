from fastapi import APIRouter, HTTPException, status
from backend.services.auth import create_user, login_user
from backend.schemas.user import UserCreate, UserLogin, Token
from backend.utils.security import verify_token, create_access_token, create_refresh_token
from typing import Optional
import logging

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Authentication"])


@router.post("/auth/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate):
    """Register a new user"""
    try:
        logger.info(f"Starting registration for: {user_data.email}")
        db_user = await create_user(user_data)
        logger.info(f"User created successfully: {db_user.id}")

        # Create tokens for the new user
        access_token_data = {"sub": db_user.email, "user_id": db_user.id}
        access_token = create_access_token(data=access_token_data)
        logger.info("Access token created")

        refresh_token_data = {"sub": db_user.email, "user_id": db_user.id}
        refresh_token = create_refresh_token(data=refresh_token_data)
        logger.info("Refresh token created")

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }
    except HTTPException as e:
        logger.warning(f"Registration failed: {e.detail}")
        raise
    except Exception as e:
        logger.error(f"Error in register endpoint: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during registration"
        )


@router.post("/auth/login", response_model=Token)
async def login(user_data: UserLogin):
    """Login a user"""
    try:
        logger.info(f"Login attempt for: {user_data.email}")
        access_token, refresh_token, user = await login_user(user_data)
        logger.info(f"Login successful for: {user.email}")

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }
    except HTTPException as e:
        logger.warning(f"Login failed for user: {e.detail}")
        raise
    except Exception as e:
        logger.error(f"Error in login endpoint: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during login"
        )


@router.post("/auth/refresh", response_model=Token)
async def refresh_token_endpoint(refresh_token: str):
    """Refresh access token using refresh token"""
    try:
        logger.info("Attempting to refresh token")
        payload = verify_token(refresh_token)

        if not payload or "user_id" not in payload:
            logger.warning("Invalid refresh token - missing user_id")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Create new access token
        access_token_data = {"sub": payload["sub"], "user_id": payload["user_id"]}
        new_access_token = create_access_token(data=access_token_data)

        # Create new refresh token (rotate refresh token)
        new_refresh_token = create_refresh_token(data=access_token_data)
        
        logger.info("Token refreshed successfully")

        return {
            "access_token": new_access_token,
            "refresh_token": new_refresh_token,
            "token_type": "bearer"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error refreshing token: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.post("/auth/logout")
async def logout():
    """Logout a user (invalidate tokens)"""
    # In a real implementation, you might add tokens to a blacklist
    # For now, we just return a success message
    return {"message": "Successfully logged out"}


@router.post("/auth/test-user", response_model=Token, status_code=status.HTTP_201_CREATED)
async def create_test_user():
    """Create a test user for development purposes"""
    try:
        test_email = "test@example.com"
        test_password = "Test@123456"
        test_name = "Test User"
        
        logger.info(f"Creating test user: {test_email}")
        
        user_data = UserCreate(
            email=test_email,
            password=test_password,
            name=test_name
        )
        
        db_user = await create_user(user_data)
        logger.info(f"Test user created successfully: {db_user.id}")

        # Create tokens for the test user
        access_token_data = {"sub": db_user.email, "user_id": db_user.id}
        access_token = create_access_token(data=access_token_data)

        refresh_token_data = {"sub": db_user.email, "user_id": db_user.id}
        refresh_token = create_refresh_token(data=refresh_token_data)

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }
    except HTTPException as e:
        if "already registered" in str(e.detail):
            logger.info("Test user already exists, attempting login...")
            # Try to login with the test user
            user_data = UserLogin(
                email="test@example.com",
                password="Test@123456"
            )
            access_token, refresh_token, user = await login_user(user_data)
            return {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "token_type": "bearer"
            }
        raise
    except Exception as e:
        logger.error(f"Error creating test user: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error: {str(e)}"
        )