from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from backend.database.engine import engine


# Create async session maker
AsyncSessionLocal = sessionmaker(
    engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)


async def get_async_session():
    """Dependency to get async session"""
    async with AsyncSessionLocal() as session:
        yield session