from fastapi import APIRouter, Depends
from typing import List

router = APIRouter()

@router.post("/classify", response_model=List[Outfit])
async def get_outfits():
    return []

@router.post("/search", response_model=List[Outfit])
async def search_outfits(vector: List[float]):

    return []
