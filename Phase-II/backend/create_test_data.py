#!/usr/bin/env python
"""Create test data - user with todos"""
import asyncio
from backend.database.session import AsyncSessionLocal
from backend.models.user import User
from backend.models.todo import Todo
from backend.utils.security import get_password_hash
from sqlmodel import select
import uuid

async def create_test_data():
    async with AsyncSessionLocal() as session:
        # Create a test user
        test_user = User(
            email="demo@example.com",
            name="Demo User",
            password_hash=get_password_hash("testpass123")
        )
        session.add(test_user)
        await session.commit()
        await session.refresh(test_user)
        print(f"✓ Test user created: {test_user.email} (ID: {test_user.id})")
        
        # Create test todos
        todos_data = [
            {
                "title": "Complete project proposal",
                "description": "Finish the proposal document for the new project",
                "priority": "high",
                "completed": False,
            },
            {
                "title": "Buy groceries",
                "description": "Milk, eggs, bread, fruits",
                "priority": "medium",
                "completed": True,
            },
            {
                "title": "Schedule meeting",
                "description": "With the team to discuss Q1 goals",
                "priority": "high",
                "completed": False,
            },
            {
                "title": "Read tech book",
                "description": "Continue reading the new tech book",
                "priority": "low",
                "completed": False,
            },
        ]
        
        for todo_data in todos_data:
            todo = Todo(
                **todo_data,
                user_id=test_user.id
            )
            session.add(todo)
        
        await session.commit()
        print(f"✓ Created {len(todos_data)} test todos")
        
        # Verify data
        result = await session.execute(
            select(Todo).where(Todo.user_id == test_user.id)
        )
        todos = result.scalars().all()
        print(f"\n✓ Verified: {len(todos)} todos in database")
        for todo in todos:
            status = "✓ Done" if todo.completed else "○ Todo"
            print(f"  {status} - {todo.title} ({todo.priority})")

asyncio.run(create_test_data())
