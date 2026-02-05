from sqlmodel import SQLModel
from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class TodoBase(SQLModel):
    title: str
    description: Optional[str] = None
    completed: bool = False
    priority: str = "medium"  # low, medium, high
    due_date: Optional[datetime] = None


class TodoCreate(TodoBase):
    pass


class TodoUpdate(TodoBase):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[str] = None  # low, medium, high
    due_date: Optional[datetime] = None


class TodoRead(TodoBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime


class TodoListResponse(SQLModel):
    todos: list[TodoRead]
    pagination: dict