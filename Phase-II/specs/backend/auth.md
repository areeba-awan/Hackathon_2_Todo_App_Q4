# Authentication Specification

## Overview
The backend implements JWT-based authentication using Better Auth. All protected endpoints require a valid JWT token in the Authorization header.

## Token Validation
- JWT tokens must be validated against Better Auth service
- Tokens must not be expired
- Invalid or expired tokens result in 401 Unauthorized responses
- Backend must verify token signature and claims

## User Identity Extraction
- Extract user identity from JWT payload
- Store user ID in request context for downstream processing
- Ensure user ID is properly validated and sanitized

## Protected Routes
- All task-related endpoints require authentication
- Unauthenticated requests return 401 Unauthorized
- Proper error messaging without exposing sensitive information

## Token Lifecycle
- Tokens are issued by Better Auth frontend integration
- Backend validates existing tokens; does not issue new ones
- Logout functionality relies on frontend token invalidation
- No server-side token storage or invalidation mechanism

## Headers
- Accept JWT tokens via `Authorization: Bearer <token>` header
- Frontend must attach this header to all authenticated requests
- No alternative authentication methods supported

## Error Handling
- Invalid token: Return 401 Unauthorized with "Invalid token" message
- Expired token: Return 401 Unauthorized with "Token expired" message
- Malformed token: Return 401 Unauthorized with "Malformed token" message