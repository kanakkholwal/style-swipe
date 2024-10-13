from motor.motor_asyncio import AsyncIOMotorDatabase

def setup_db(db: AsyncIOMotorDatabase):
    # Setup collections if necessary
    db.users.create_index("email", unique=True)
    db.outfits.create_index([("vector", "2dsphere")])  # Index for vector search
