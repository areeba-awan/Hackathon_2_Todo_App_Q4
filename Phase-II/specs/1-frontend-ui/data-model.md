# Data Model: Frontend UI for Evolution of Todo

**Feature**: Frontend UI for Evolution of Todo
**Date**: 2026-01-17
**Related Plan**: specs/1-frontend-ui/plan.md

## Frontend Type Definitions

### User Interface
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  language: string;
  timezone: string;
}
```

### Task Interface
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date | null;
  priority: TaskPriority;
  category?: string;
  tags?: string[];
  userId: string; // References the User who owns this task
  createdAt: Date;
  updatedAt: Date;
}

type TaskPriority = 'low' | 'medium' | 'high';

type TaskStatus = 'pending' | 'in-progress' | 'completed';
```

### API Response Types
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
```

### Form Data Types
```typescript
interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface SignupFormData extends LoginFormData {
  name: string;
  confirmPassword: string;
}

interface TaskFormData {
  title: string;
  description?: string;
  dueDate?: Date | null;
  priority: TaskPriority;
  category?: string;
  tags?: string[];
  completed: boolean;
}
```

### UI State Types
```typescript
interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  category?: string;
  searchQuery?: string;
  sortBy?: 'dueDate' | 'priority' | 'createdAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}

interface LoadingStates {
  tasks: boolean;
  taskDetail: boolean;
  user: boolean;
  auth: boolean;
}

interface ErrorStates {
  tasks?: string;
  taskDetail?: string;
  user?: string;
  auth?: string;
}
```

## Validation Rules

### User Validation
- Email: Must be a valid email format
- Name: Required, 2-50 characters
- Password: At least 8 characters with one uppercase, lowercase, number, and special character (for signup)

### Task Validation
- Title: Required, 1-100 characters
- Description: Optional, maximum 1000 characters
- Due Date: Optional, must be a valid date if provided
- Priority: Required, must be one of 'low', 'medium', 'high'
- Category: Optional, 1-50 characters if provided
- Tags: Optional, maximum 5 tags, each 1-30 characters

## State Transitions

### Task State Transitions
- `pending` → `in-progress`: When user starts working on the task
- `in-progress` → `completed`: When user marks task as complete
- `completed` → `pending`: When user reopens the task
- `in-progress` → `pending`: When user stops working on the task

### Authentication State Transitions
- `unauthenticated` → `loading`: When authentication is initiated
- `loading` → `authenticated`: When authentication succeeds
- `loading` → `unauthenticated`: When authentication fails
- `authenticated` → `unauthenticated`: When user logs out or session expires

## Relationships

### User-Task Relationship
- One User can have many Tasks (one-to-many relationship)
- Each Task belongs to exactly one User
- Tasks are filtered by userId to ensure user isolation