# Todo App Backend Overview

## Purpose
This document outlines the backend architecture and functionality for the Todo application. The backend provides a secure, scalable API that handles user authentication, task management, and data persistence.

## Core Components
- **Authentication Service**: JWT-based authentication using Better Auth
- **Task Management API**: CRUD operations for user tasks
- **User Management**: Multi-user support with data isolation
- **Database Layer**: PostgreSQL schema for storing user data and tasks

## Technology Stack
- **Framework**: FastAPI (Python)
- **Database**: Neon PostgreSQL
- **Authentication**: Better Auth (JWT)
- **API Style**: RESTful endpoints
- **Database ORM**: SQLModel or SQLAlchemy

## Key Features
- Secure user authentication and authorization
- Task creation, retrieval, updating, and deletion
- Task completion toggling
- User data isolation (users can only access their own tasks)
- Comprehensive error handling
- Consistent API response formats

## Integration Points
- Frontend communicates via REST API calls
- JWT tokens provided by Better Auth for authentication
- PostgreSQL database for data persistence