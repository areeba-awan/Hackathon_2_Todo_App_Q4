# API Contracts: Frontend UI for Evolution of Todo

**Feature**: Frontend UI for Evolution of Todo
**Date**: 2026-01-17
**Related Plan**: specs/1-frontend-ui/plan.md

## Overview

This document specifies the API contracts that the frontend will consume. These represent the interface between the frontend and backend services.

## Authentication Endpoints

### POST /api/auth/signup
Register a new user account

**Request Body:**
```json
{
  "name": "string (2-50 characters)",
  "email": "valid email format",
  "password": "string (minimum 8 characters)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string"
    },
    "token": "JWT token string"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

### POST /api/auth/login
Authenticate a user

**Request Body:**
```json
{
  "email": "valid email format",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string"
    },
    "token": "JWT token string"
  }
}
```

### POST /api/auth/logout
Log out the current user

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Task Management Endpoints

### GET /api/tasks
Retrieve the current user's tasks

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Query Parameters:**
- `page` (optional): Page number for pagination
- `limit` (optional): Number of tasks per page
- `status` (optional): Filter by task status (pending, completed)
- `priority` (optional): Filter by priority (low, medium, high)
- `search` (optional): Search term for title/description

**Response:**
```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "string",
        "title": "string",
        "description": "string (optional)",
        "completed": "boolean",
        "dueDate": "ISO date string (optional)",
        "priority": "low|medium|high",
        "category": "string (optional)",
        "tags": ["string"],
        "userId": "string",
        "createdAt": "ISO date string",
        "updatedAt": "ISO date string"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalCount": "number",
      "hasNextPage": "boolean",
      "hasPreviousPage": "boolean"
    }
  }
}
```

### POST /api/tasks
Create a new task

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Request Body:**
```json
{
  "title": "string (1-100 characters)",
  "description": "string (optional, max 1000 characters)",
  "dueDate": "ISO date string (optional)",
  "priority": "low|medium|high",
  "category": "string (optional)",
  "tags": ["string (optional)"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "string",
      "title": "string",
      "description": "string (optional)",
      "completed": false,
      "dueDate": "ISO date string (optional)",
      "priority": "low|medium|high",
      "category": "string (optional)",
      "tags": ["string"],
      "userId": "string",
      "createdAt": "ISO date string",
      "updatedAt": "ISO date string"
    }
  }
}
```

### GET /api/tasks/{id}
Retrieve a specific task

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "string",
      "title": "string",
      "description": "string (optional)",
      "completed": "boolean",
      "dueDate": "ISO date string (optional)",
      "priority": "low|medium|high",
      "category": "string (optional)",
      "tags": ["string"],
      "userId": "string",
      "createdAt": "ISO date string",
      "updatedAt": "ISO date string"
    }
  }
}
```

### PUT /api/tasks/{id}
Update an existing task

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Request Body:**
```json
{
  "title": "string (1-100 characters) (optional)",
  "description": "string (optional)",
  "completed": "boolean (optional)",
  "dueDate": "ISO date string (optional)",
  "priority": "low|medium|high (optional)",
  "category": "string (optional)",
  "tags": ["string (optional)"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "string",
      "title": "string",
      "description": "string (optional)",
      "completed": "boolean",
      "dueDate": "ISO date string (optional)",
      "priority": "low|medium|high",
      "category": "string (optional)",
      "tags": ["string"],
      "userId": "string",
      "createdAt": "ISO date string",
      "updatedAt": "ISO date string"
    }
  }
}
```

### DELETE /api/tasks/{id}
Delete a task

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## User Profile Endpoints

### GET /api/profile
Retrieve the current user's profile

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "preferences": {
        "theme": "light|dark|system",
        "notificationsEnabled": "boolean",
        "language": "string",
        "timezone": "string"
      },
      "createdAt": "ISO date string",
      "updatedAt": "ISO date string"
    }
  }
}
```

### PUT /api/profile
Update the current user's profile

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Request Body:**
```json
{
  "name": "string (optional)",
  "preferences": {
    "theme": "light|dark|system (optional)",
    "notificationsEnabled": "boolean (optional)",
    "language": "string (optional)",
    "timezone": "string (optional)"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "preferences": {
        "theme": "light|dark|system",
        "notificationsEnabled": "boolean",
        "language": "string",
        "timezone": "string"
      },
      "createdAt": "ISO date string",
      "updatedAt": "ISO date string"
    }
  }
}
```

## Error Handling

All API endpoints follow the same error response format:

```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

### Common Error Codes:
- `UNAUTHORIZED`: Missing or invalid JWT token
- `FORBIDDEN`: User does not have permission for this action
- `VALIDATION_ERROR`: Request data does not meet validation requirements
- `RESOURCE_NOT_FOUND`: Requested resource does not exist
- `INTERNAL_ERROR`: Unexpected server error

## Authentication Requirements

All endpoints except `/api/auth/signup` and `/api/auth/login` require a valid JWT token in the Authorization header:

```
Authorization: Bearer {JWT_TOKEN}
```

Tokens are obtained through the login or signup endpoints and should be stored securely on the frontend.