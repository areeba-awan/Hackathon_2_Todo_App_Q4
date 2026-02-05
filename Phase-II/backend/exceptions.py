class TodoException(Exception):
    """Base exception class for todo-related errors"""
    def __init__(self, message: str, code: str = "TODO_ERROR"):
        self.message = message
        self.code = code
        super().__init__(self.message)


class UserNotFoundException(TodoException):
    """Raised when a user is not found"""
    def __init__(self, user_id: str):
        self.user_id = user_id
        super().__init__(f"User with ID {user_id} not found", "USER_NOT_FOUND")


class TodoNotFoundException(TodoException):
    """Raised when a todo is not found"""
    def __init__(self, todo_id: str):
        self.todo_id = todo_id
        super().__init__(f"Todo with ID {todo_id} not found", "TODO_NOT_FOUND")


class ValidationError(TodoException):
    """Raised when validation fails"""
    def __init__(self, message: str):
        super().__init__(message, "VALIDATION_ERROR")


class AuthenticationException(TodoException):
    """Raised when authentication fails"""
    def __init__(self, message: str = "Authentication failed"):
        super().__init__(message, "AUTHENTICATION_ERROR")


class AuthorizationException(TodoException):
    """Raised when authorization fails"""
    def __init__(self, message: str = "Not authorized"):
        super().__init__(message, "AUTHORIZATION_ERROR")