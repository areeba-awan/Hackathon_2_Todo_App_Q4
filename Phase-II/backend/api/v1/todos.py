from fastapi import APIRouter, Depends, HTTPException, status, Query, Header
from typing import Optional, List
from backend.services.todos import create_todo, get_todo_by_id, get_todos_for_user, update_todo, delete_todo
from backend.schemas.todo import TodoCreate, TodoUpdate, TodoRead, TodoListResponse
from backend.utils.security import verify_token
from backend.services.auth import get_user_by_email
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/todos", tags=["Todos"])


@router.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {"status": "ok"}


@router.get("/test-auth", tags=["Health"])
async def test_auth(authorization: Optional[str] = Header(None)):
    """Test if Authorization header is received"""
    return {
        "received_header": authorization is not None,
        "header_value": authorization[:20] + "..." if authorization else None,
    }


def get_current_user(authorization: Optional[str] = Header(None)) -> str:
    """Get current user from token - extract from Authorization header directly"""
    try:
        # Check if Authorization header exists
        if not authorization:
            logger.warning("No Authorization header provided")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Extract token from "Bearer <token>" format
        parts = authorization.split()
        if len(parts) != 2 or parts[0].lower() != "bearer":
            logger.warning(f"Invalid Authorization header format: {parts}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        token = parts[1]
        logger.info(f"Extracted token: {token[:20]}...")
        
        # Verify the token
        payload = verify_token(token)
        if not payload:
            logger.warning("Token verification failed")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        logger.info(f"Token verified: {payload}")
        
        # Check for required fields
        if "user_id" not in payload:
            logger.warning(f"Token missing user_id: {payload.keys()}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        email: str = payload.get("sub")
        if email is None:
            logger.warning("Token missing 'sub' claim")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Extract user_id from payload
        user_id = payload.get("user_id")
        logger.info(f"User authenticated: {user_id}")
        return user_id
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in get_current_user: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.get("/", response_model=TodoListResponse)
@router.get("", response_model=TodoListResponse)
async def get_todos(
    current_user_id: str = Depends(get_current_user),
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0),
    status_filter: Optional[str] = Query(None, regex="^(active|completed)$"),
    priority_filter: Optional[str] = Query(None, regex="^(low|medium|high)$"),
    search: Optional[str] = Query(None)
):
    """Get todos for the current user with optional filters and pagination"""
    todos, total_count = await get_todos_for_user(
        user_id=current_user_id,
        limit=limit,
        offset=offset,
        status_filter=status_filter,
        priority_filter=priority_filter,
        search=search
    )
    
    return {
        "todos": todos,
        "pagination": {
            "total": total_count,
            "limit": limit,
            "offset": offset,
            "has_more": offset + limit < total_count
        }
    }


@router.post("/", response_model=TodoRead, status_code=status.HTTP_201_CREATED)
async def create_new_todo(
    todo_data: TodoCreate,
    current_user_id: str = Depends(get_current_user)
):
    """Create a new todo for the current user"""
    return await create_todo(todo_data, current_user_id)


@router.get("/{todo_id}", response_model=TodoRead)
async def get_todo(
    todo_id: str,
    current_user_id: str = Depends(get_current_user)
):
    """Get a specific todo by ID for the current user"""
    todo = await get_todo_by_id(todo_id, current_user_id)
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    return todo


@router.put("/{todo_id}", response_model=TodoRead)
async def update_existing_todo(
    todo_id: str,
    todo_update: TodoUpdate,
    current_user_id: str = Depends(get_current_user)
):
    """Update a specific todo for the current user"""
    updated_todo = await update_todo(todo_id, todo_update, current_user_id)
    if not updated_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    return updated_todo


@router.patch("/{todo_id}", response_model=TodoRead)
async def partial_update_todo(
    todo_id: str,
    todo_update: TodoUpdate,
    current_user_id: str = Depends(get_current_user)
):
    """Partially update a specific todo for the current user"""
    updated_todo = await update_todo(todo_id, todo_update, current_user_id)
    if not updated_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    return updated_todo


@router.delete("/{todo_id}")
async def delete_existing_todo(
    todo_id: str,
    current_user_id: str = Depends(get_current_user)
):
    """Delete a specific todo for the current user"""
    success = await delete_todo(todo_id, current_user_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    return {"message": "Todo deleted successfully"}