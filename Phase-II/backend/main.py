from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
import logging
import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import models to register them with SQLModel metadata first
# Must import in order: todo first, then user (to avoid circular import issues)
from backend.models import todo, user
from backend.api.v1.api_router import api_router
from backend.database.session import engine
from backend.models.base import create_db_and_tables

# Configure logging with more detail
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
    ]
)
logger = logging.getLogger(__name__)

# Set specific loggers to DEBUG for debugging
logging.getLogger("backend.api.v1.todos").setLevel(logging.DEBUG)
logging.getLogger("backend.utils.security").setLevel(logging.DEBUG)
logging.getLogger("backend.services.auth").setLevel(logging.DEBUG)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Initializing database...")
    try:
        await create_db_and_tables(engine)
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Error initializing database: {e}")
        import traceback
        traceback.print_exc()
        raise

    yield

    # Shutdown
    logger.info("Shutting down...")

app = FastAPI(
    title="Todo Backend API",
    description="Backend API for the Todo application",
    version="0.1.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://192.168.100.6:3000",
        "http://192.168.100.6:3001",
        "http://localhost",
        "http://127.0.0.1",
        "*",  # Allow all origins for development
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
)

# Global exception handlers
@app.exception_handler(StarletteHTTPException)
async def custom_http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    # Extract error details and convert to serializable format
    errors = []
    for error in exc.errors():
        error_dict = {
            "field": ".".join(str(x) for x in error.get("loc", [])),
            "message": error.get("msg", "Validation error"),
            "type": error.get("type", "value_error")
        }
        errors.append(error_dict)
    
    return JSONResponse(
        status_code=422,
        content={
            "detail": "Validation failed",
            "errors": errors
        }
    )

@app.get("/")
async def root():
    return {"message": "Welcome to the Todo Backend API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "todo-backend"}

@app.get("/test")
async def test_endpoint():
    try:
        print("Test endpoint called")
        return {"message": "Test endpoint working"}
    except Exception as e:
        print(f"Error in test endpoint: {e}")
        import traceback
        traceback.print_exc()
        raise

# Include API routes
app.include_router(api_router, prefix="/api/v1")

if __name__ == "__main__":
    import uvicorn
    try:
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=8001,
            reload=False
        )
    except Exception as e:
        print(f"Error starting server: {e}")
        import traceback
        traceback.print_exc()