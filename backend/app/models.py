from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional

class User(BaseModel):
    id: Optional[str]
    name: str
    email: EmailStr
    hashed_password: str

class Outfit(BaseModel):
    id: Optional[str]
    title: str
    description: Optional[str]
    image_url: str
    vector: List[float] = Field(..., example=[0.1, 0.2, 0.3])
