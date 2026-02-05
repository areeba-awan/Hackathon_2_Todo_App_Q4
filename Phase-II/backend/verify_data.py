#!/usr/bin/env python
"""Verify todos in database"""
import asyncio
from backend.database.session import AsyncSessionLocal
from backend.models.todo import Todo
from backend.models.user import User
from sqlmodel import select

async def verify_data():
    async with AsyncSessionLocal() as session:
        # Get all users
        result = await session.execute(select(User))
        users = result.scalars().all()
        print(f"\n📊 Total Users: {len(users)}")
        
        for user in users:
            print(f"\n👤 User: {user.email}")
            
            # Get todos for this user
            result = await session.execute(
                select(Todo).where(Todo.user_id == user.id)
            )
            todos = result.scalars().all()
            print(f"   📝 Todos: {len(todos)}")
            
            for todo in todos:
                status = "✅" if todo.completed else "⭕"
                print(f"      {status} {todo.title}")
                if todo.description:
                    print(f"         → {todo.description}")

asyncio.run(verify_data())
