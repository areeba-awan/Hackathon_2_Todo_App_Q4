from fastapi import HTTPException, status
from fastapi.security import HTTPBearer
from backend.utils.security import verify_token


class AuthMiddleware:
    def __init__(self):
        self.security = HTTPBearer()

    async def verify_token(self, token: str):
        """Verify the token and return payload if valid"""
        payload = verify_token(token)
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return payload