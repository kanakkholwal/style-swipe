from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings
from app.routers import outfits, users
from app.database import setup_db

app = FastAPI(
    title="StyleSwipe",
    description="Backend for StyleSwipe project using FastAPI and MongoDB",
    version="1.0.0",
)

# Setup database connection
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(settings.MONGODB_URL)
    app.mongodb = app.mongodb_client[settings.DB_NAME]
    setup_db(app.mongodb)

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

# Include routers
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(outfits.router, prefix="/api/v1/outfits", tags=["Outfits"])

# Root route
@app.get("/")
async def root():
    return {"message": "Welcome to the StyleSwipe API"}
