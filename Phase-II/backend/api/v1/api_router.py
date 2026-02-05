from fastapi import APIRouter
from backend.api.v1 import auth, todos, debug


api_router = APIRouter()
api_router.include_router(auth.router)  # No prefix since routes in auth.py already have /auth prefix
api_router.include_router(todos.router)
api_router.include_router(debug.router)  # Debug endpoints