#!/usr/bin/env python
"""Test registration endpoint"""
import asyncio
import httpx
import json

async def test_register():
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "http://localhost:8001/api/v1/auth/register",
                json={
                    "email": "test@example.com",
                    "name": "Test User",
                    "password": "testpassword123"
                }
            )
            print(f"Status: {response.status_code}")
            print(f"Response: {json.dumps(response.json(), indent=2)}")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_register())
