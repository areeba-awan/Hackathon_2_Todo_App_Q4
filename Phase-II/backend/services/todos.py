from typing import List, Optional
from sqlmodel import select, and_, func
from sqlalchemy.exc import IntegrityError
from backend.models.todo import Todo
from backend.schemas.todo import TodoCreate, TodoUpdate, TodoRead
from backend.database.session import AsyncSessionLocal
from fastapi import HTTPException, status
from datetime import datetime


async def create_todo(todo_data: TodoCreate, user_id: str) -> Todo:
    """Create a new todo for a user"""
    async with AsyncSessionLocal() as session:
        db_todo = Todo(
            **todo_data.dict(),
            user_id=user_id
        )
        
        session.add(db_todo)
        try:
            await session.commit()
            await session.refresh(db_todo)
            return db_todo
        except IntegrityError:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Error creating todo"
            )


async def get_todo_by_id(todo_id: str, user_id: str) -> Optional[Todo]:
    """Get a specific todo by ID for a user"""
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(Todo).where(and_(Todo.id == todo_id, Todo.user_id == user_id))
        )
        return result.scalars().first()


async def get_todos_for_user(
    user_id: str, 
    limit: int = 10, 
    offset: int = 0, 
    status_filter: Optional[str] = None,
    priority_filter: Optional[str] = None,
    search: Optional[str] = None
) -> tuple[List[Todo], int]:
    """Get todos for a user with optional filters and pagination"""
    async with AsyncSessionLocal() as session:
        # Build query with filters
        query = select(Todo).where(Todo.user_id == user_id)
        
        if status_filter:
            if status_filter.lower() == "active":
                query = query.where(Todo.completed == False)
            elif status_filter.lower() == "completed":
                query = query.where(Todo.completed == True)
        
        if priority_filter:
            query = query.where(Todo.priority == priority_filter.lower())
        
        if search:
            query = query.where(Todo.title.contains(search) | Todo.description.contains(search))
        
        # Get total count for pagination
        count_query = select(func.count()).select_from(Todo).where(Todo.user_id == user_id)
        if status_filter:
            if status_filter.lower() == "active":
                count_query = count_query.where(Todo.completed == False)
            elif status_filter.lower() == "completed":
                count_query = count_query.where(Todo.completed == True)
        if priority_filter:
            count_query = count_query.where(Todo.priority == priority_filter.lower())
        if search:
            count_query = count_query.where(Todo.title.contains(search) | Todo.description.contains(search))
        
        total_count_result = await session.execute(count_query)
        total_count = total_count_result.scalar() or 0
        
        # Apply pagination
        query = query.offset(offset).limit(limit).order_by(Todo.created_at.desc())
        
        result = await session.execute(query)
        todos = result.scalars().all()
        
        return todos, total_count


async def update_todo(todo_id: str, todo_update: TodoUpdate, user_id: str) -> Optional[Todo]:
    """Update a specific todo for a user"""
    async with AsyncSessionLocal() as session:
        # Get the existing todo
        result = await session.execute(
            select(Todo).where(and_(Todo.id == todo_id, Todo.user_id == user_id))
        )
        db_todo = result.scalars().first()
        
        if not db_todo:
            return None
        
        # Update the todo with provided values
        update_data = todo_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_todo, field, value)
        
        # Update the updated_at timestamp
        db_todo.updated_at = datetime.utcnow()
        
        try:
            await session.commit()
            await session.refresh(db_todo)
            return db_todo
        except IntegrityError:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Error updating todo"
            )


async def delete_todo(todo_id: str, user_id: str) -> bool:
    """Delete a specific todo for a user"""
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(Todo).where(and_(Todo.id == todo_id, Todo.user_id == user_id))
        )
        db_todo = result.scalars().first()
        
        if not db_todo:
            return False
        
        await session.delete(db_todo)
        await session.commit()
        return True