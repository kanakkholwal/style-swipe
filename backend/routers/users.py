from fastapi import APIRouter, Depends, HTTPException
from app.models import User
from app.database import AsyncIOMotorDatabase

router = APIRouter()

@router.post("/", response_model=User)
async def create_user(user: User, db: AsyncIOMotorDatabase = Depends()):
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_dict = user.dict()
    del user_dict["id"]
    await db.users.insert_one(user_dict)
    return user
