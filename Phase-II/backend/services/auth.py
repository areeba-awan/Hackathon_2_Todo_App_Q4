from typing import Optional
from sqlmodel import select
from sqlalchemy.exc import IntegrityError
from backend.models.user import User
from backend.schemas.user import UserCreate, UserLogin
from backend.utils.security import verify_password, get_password_hash, create_access_token, create_refresh_token
from backend.database.session import AsyncSessionLocal
from backend.config.settings import settings
from fastapi import HTTPException, status
import uuid


async def create_user(user_data: UserCreate) -> User:
    """Create a new user with hashed password"""
    try:
        print(f"Starting create_user for email: {user_data.email}")

        # Hash the password first to make sure this works
        print("Hashing password...")
        hashed_password = get_password_hash(user_data.password)
        print(f"Password hashed successfully")

        async with AsyncSessionLocal() as session:
            print("Session created successfully")

            # Check if user already exists
            print("Checking if user already exists...")
            existing_user_result = await session.execute(select(User).where(User.email == user_data.email))
            existing = existing_user_result.scalar_one_or_none()
            if existing:
                print(f"User already exists: {user_data.email}")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered"
                )
            print("User does not exist, proceeding with creation")

            # Create new user
            print("Creating new user object...")
            db_user = User(
                email=user_data.email,
                name=user_data.name,
                password_hash=hashed_password
            )
            print(f"User object created with ID: {getattr(db_user, 'id', 'NO_ID_SET')}")

            print("Adding user to session...")
            session.add(db_user)
            print("Committing transaction...")
            try:
                await session.commit()
                print("Transaction committed")
                await session.refresh(db_user)
                print(f"User refreshed, final ID: {db_user.id}")
                return db_user
            except IntegrityError as e:
                print(f"IntegrityError during commit: {e}")
                await session.rollback()
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered"
                )
    except Exception as e:
        print(f"Unexpected error in create_user: {e}")
        import traceback
        traceback.print_exc()
        raise


async def authenticate_user(email: str, password: str) -> Optional[User]:
    """Authenticate user with email and password"""
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()

        if not user or not verify_password(password, user.password_hash):
            return None

        return user


async def login_user(user_login: UserLogin) -> tuple[str, str, User]:
    """Login user and return access and refresh tokens"""
    user = await authenticate_user(user_login.email, user_login.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access and refresh tokens
    access_token_data = {"sub": user.email, "user_id": user.id}
    access_token = create_access_token(data=access_token_data)

    refresh_token_data = {"sub": user.email, "user_id": user.id}
    refresh_token = create_refresh_token(data=access_token_data)

    return access_token, refresh_token, user


async def get_user_by_email(email: str) -> Optional[User]:
    """Get user by email"""
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()


async def get_user_by_id(user_id: str) -> Optional[User]:
    """Get user by ID"""
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()