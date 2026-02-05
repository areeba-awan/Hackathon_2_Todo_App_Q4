# Database Schema Specification

## Overview
PostgreSQL schema for the Todo application using Neon as the database provider. The schema enforces data integrity and supports multi-user isolation.

## Tables

### Users Table
- **Table Name**: `users`
- **Fields**:
  - `id` (UUID, Primary Key, NOT NULL) - Unique user identifier from Better Auth
  - `email` (VARCHAR(255), UNIQUE, NOT NULL) - User's email address
  - `created_at` (TIMESTAMP, NOT NULL) - Account creation timestamp
  - `updated_at` (TIMESTAMP, NOT NULL) - Last update timestamp

### Tasks Table
- **Table Name**: `tasks`
- **Fields**:
  - `id` (UUID, Primary Key, NOT NULL) - Unique task identifier
  - `user_id` (UUID, Foreign Key, NOT NULL) - References users.id
  - `title` (VARCHAR(255), NOT NULL) - Task title
  - `description` (TEXT) - Optional task description
  - `completed` (BOOLEAN, DEFAULT FALSE, NOT NULL) - Completion status
  - `created_at` (TIMESTAMP, NOT NULL) - Task creation timestamp
  - `updated_at` (TIMESTAMP, NOT NULL) - Last update timestamp

## Relationships
- `tasks.user_id` references `users.id` with CASCADE delete
- A user can have zero or many tasks
- A task belongs to exactly one user

## Indexes
- Index on `users.email` for efficient login lookups
- Index on `tasks.user_id` for efficient user task queries
- Index on `tasks.completed` for filtering completed tasks

## Constraints
- Foreign key constraint ensures referential integrity
- NOT NULL constraints on required fields
- UNIQUE constraint on user email addresses
- Check constraint to ensure user_id matches authenticated user on task operations

## Data Types
- UUID for primary keys to ensure global uniqueness
- VARCHAR for text fields with appropriate length limits
- BOOLEAN for binary states like task completion
- TIMESTAMP for temporal data

## Access Control
- All queries must validate that requesting user owns the data
- No cross-user data access is permitted
- Queries must filter by user_id to prevent unauthorized access