from fastapi import APIRouter, Depends
from typing import List
from app.models import Outfit
from app.database import AsyncIOMotorDatabase

router = APIRouter()

@router.post("/", response_model=Outfit)
async def create_outfit(outfit: Outfit, db: AsyncIOMotorDatabase = Depends()):
    outfit_dict = outfit.dict()
    del outfit_dict["id"]
    await db.outfits.insert_one(outfit_dict)
    return outfit

@router.get("/", response_model=List[Outfit])
async def get_outfits(limit: int = 10, db: AsyncIOMotorDatabase = Depends()):
    outfits = await db.outfits.find().to_list(limit)
    return outfits

@router.post("/search", response_model=List[Outfit])
async def search_outfits(vector: List[float], db: AsyncIOMotorDatabase = Depends(), limit: int = 10):
    cursor = db.outfits.find(
        {"vector": {"$near": {"$geometry": {"type": "Point", "coordinates": vector}}}}
    ).limit(limit)
    outfits = await cursor.to_list(limit)
    return outfits
