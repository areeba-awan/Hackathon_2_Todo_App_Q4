from services.auth import create_user
from schemas.user import UserCreate

# Test creating a user directly
async def test_create_user():
    # Use a shorter password to avoid bcrypt limitations
    user_data = UserCreate(name="Test User", email="test@example.com", password="shortpass123")
    try:
        result = await create_user(user_data)
        print("User created successfully:", result)
    except Exception as e:
        print(f"Error creating user: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    import asyncio
    asyncio.run(test_create_user())