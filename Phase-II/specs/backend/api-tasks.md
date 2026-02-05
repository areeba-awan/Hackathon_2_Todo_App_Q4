# Task API Endpoints Specification

## Overview
REST API endpoints for managing user tasks. All endpoints require authentication via JWT token.

## Base URL
All endpoints are prefixed with `/api/v1/tasks`

## Common Headers
- `Authorization: Bearer <jwt_token>` - Required for all endpoints
- `Content-Type: application/json` - For POST/PUT requests

## Endpoints

### Create Task
- **Method**: POST
- **Path**: `/api/v1/tasks`
- **Headers**: Authorization
- **Request Body**:
  ```json
  {
    "title": "Task title (string, required)",
    "description": "Task description (string, optional)"
  }
  ```
- **Response Codes**:
  - 201 Created: Task successfully created
  - 400 Bad Request: Invalid request body
  - 401 Unauthorized: Invalid or missing token
- **Response Body (201)**:
  ```json
  {
    "id": "uuid",
    "user_id": "user uuid",
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
  ```

### Get User's Tasks
- **Method**: GET
- **Path**: `/api/v1/tasks`
- **Headers**: Authorization
- **Query Parameters**:
  - `completed` (optional): Filter by completion status (true/false)
  - `limit` (optional): Number of tasks to return (default: 50, max: 100)
  - `offset` (optional): Number of tasks to skip (for pagination)
- **Response Codes**:
  - 200 OK: Successfully retrieved tasks
  - 401 Unauthorized: Invalid or missing token
- **Response Body (200)**:
  ```json
  {
    "tasks": [
      {
        "id": "uuid",
        "user_id": "user uuid",
        "title": "Task title",
        "description": "Task description",
        "completed": false,
        "created_at": "timestamp",
        "updated_at": "timestamp"
      }
    ],
    "total_count": 10,
    "limit": 50,
    "offset": 0
  }
  ```

### Get Specific Task
- **Method**: GET
- **Path**: `/api/v1/tasks/{task_id}`
- **Headers**: Authorization
- **Path Parameters**:
  - `task_id` (required): UUID of the task to retrieve
- **Response Codes**:
  - 200 OK: Task found and returned
  - 401 Unauthorized: Invalid or missing token
  - 403 Forbidden: User doesn't own the task
  - 404 Not Found: Task doesn't exist
- **Response Body (200)**:
  ```json
  {
    "id": "uuid",
    "user_id": "user uuid",
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
  ```

### Update Task
- **Method**: PUT
- **Path**: `/api/v1/tasks/{task_id}`
- **Headers**: Authorization
- **Path Parameters**:
  - `task_id` (required): UUID of the task to update
- **Request Body**:
  ```json
  {
    "title": "Updated task title (optional)",
    "description": "Updated task description (optional)",
    "completed": true (optional)
  }
  ```
- **Response Codes**:
  - 200 OK: Task successfully updated
  - 400 Bad Request: Invalid request body
  - 401 Unauthorized: Invalid or missing token
  - 403 Forbidden: User doesn't own the task
  - 404 Not Found: Task doesn't exist
- **Response Body (200)**:
  ```json
  {
    "id": "uuid",
    "user_id": "user uuid",
    "title": "Updated task title",
    "description": "Updated task description",
    "completed": true,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
  ```

### Toggle Task Completion
- **Method**: PATCH
- **Path**: `/api/v1/tasks/{task_id}/toggle-completion`
- **Headers**: Authorization
- **Path Parameters**:
  - `task_id` (required): UUID of the task to update
- **Response Codes**:
  - 200 OK: Task completion status successfully toggled
  - 401 Unauthorized: Invalid or missing token
  - 403 Forbidden: User doesn't own the task
  - 404 Not Found: Task doesn't exist
- **Response Body (200)**:
  ```json
  {
    "id": "uuid",
    "user_id": "user uuid",
    "title": "Task title",
    "description": "Task description",
    "completed": true,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
  ```

### Delete Task
- **Method**: DELETE
- **Path**: `/api/v1/tasks/{task_id}`
- **Headers**: Authorization
- **Path Parameters**:
  - `task_id` (required): UUID of the task to delete
- **Response Codes**:
  - 204 No Content: Task successfully deleted
  - 401 Unauthorized: Invalid or missing token
  - 403 Forbidden: User doesn't own the task
  - 404 Not Found: Task doesn't exist

## Ownership Validation
- All operations validate that the authenticated user owns the task
- Operations on tasks owned by other users return 403 Forbidden
- User ID from JWT token is compared with task's user_id in database

## Validation
- Task titles must be 1-255 characters
- Descriptions must be 0-1000 characters
- Invalid inputs return 400 Bad Request with specific error messages