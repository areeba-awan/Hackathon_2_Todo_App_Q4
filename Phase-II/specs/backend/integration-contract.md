# Frontend-Backend Integration Contract

## Overview
This document defines the contract between the frontend and backend systems for the Todo application. It specifies the exact API behavior, data formats, and integration requirements.

## Authentication Contract

### Token Transmission
- Frontend sends JWT token in `Authorization: Bearer <token>` header
- Backend expects token exactly as provided by Better Auth
- No token modification or preprocessing by frontend

### Token Validation
- Backend validates token signature against Better Auth
- Invalid tokens receive 401 responses
- Frontend must handle 401 responses by redirecting to login

## API Response Contract

### Success Responses
- All successful responses return 200 status code unless otherwise specified
- Response bodies follow consistent JSON structure
- Timestamps in ISO 8601 format
- UUIDs in standard format

### Error Responses
- Follow standardized error response format
- Consistent error codes across all endpoints
- Human-readable messages without system details

## Data Format Contract

### Request Bodies
- All requests use `Content-Type: application/json`
- String fields trimmed of leading/trailing whitespace
- Boolean values as true/false (not strings "true"/"false")

### Response Bodies
- Dates/timestamps in ISO 8601 format (YYYY-MM-DDTHH:MM:SS.sssZ)
- UUIDs in lowercase with hyphens
- Consistent field naming (camelCase for frontend, snake_case for backend)

## Endpoint Behavior Contract

### Task Creation
- POST to `/api/v1/tasks` creates new task
- Returns complete task object with server-generated fields
- Creation timestamp set by server, not client

### Task Retrieval
- GET to `/api/v1/tasks` returns user's tasks only
- Pagination parameters honored if provided
- Total count included in response

### Task Updates
- PUT to `/api/v1/tasks/{id}` replaces entire task
- PATCH to `/api/v1/tasks/{id}/toggle-completion` only updates completion status
- Returns updated task object with new timestamps

### Task Deletion
- DELETE to `/api/v1/tasks/{id}` removes task
- Returns 204 No Content on success
- No response body for successful deletions

## Error Handling Contract

### Client Errors (4xx)
- Frontend receives structured error responses
- Error messages suitable for user display
- Sufficient detail for debugging without exposing internals

### Server Errors (5xx)
- Backend logs detailed error information
- Frontend receives generic error message
- Frontend should implement retry logic for 5xx errors

## Timeout and Performance Contract

### Response Times
- 95% of requests respond within 1 second
- Frontend implements appropriate loading states
- Timeout threshold of 10 seconds for API requests

### Rate Limiting
- Backend may implement rate limiting
- Frontend should handle 429 responses gracefully
- Backoff strategy for rate-limited requests

## Security Contract

### Data Validation
- Backend validates all incoming data
- Frontend validation is advisory only
- Backend enforces all business rules regardless of frontend behavior

### Cross-Origin Requests
- Backend configured for CORS as required by frontend
- Origin validation performed by backend
- Credentials handling according to security requirements

## Versioning Contract

### API Versioning
- API version included in URL path (`/api/v1/...`)
- Backward-compatible changes don't increment version
- Breaking changes require new API version

### Deprecation Policy
- 90 days advance notice for deprecated endpoints
- Alternative implementations provided for deprecated functionality
- Monitoring in place to track usage of deprecated features