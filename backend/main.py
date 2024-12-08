from fastapi import FastAPI
# from motor.motor_asyncio import AsyncIOMotorClient
# from app.config import settings
from app.routers import model
# from app.database import setup_db

app = FastAPI(
    title="StyleSwipe",
    description="Backend for StyleSwipe project using FastAPI and MongoDB",
    version="1.0.0",
)

# # Setup database connection
# @app.on_event("startup")
# async def startup_db_client():
#     app.mongodb_client = AsyncIOMotorClient(settings.MONGODB_URL)
#     app.mongodb = app.mongodb_client[settings.DB_NAME]
#     setup_db(app.mongodb)

# @app.on_event("shutdown")
# async def shutdown_db_client():
#     app.mongodb_client.close()

# Include routers
app.include_router(model.router, prefix="/api/v1/model", tags=["Models"])

# Root route
@app.get("/")
async def root():
    return {"message": "Welcome to the StyleSwipe API"}
