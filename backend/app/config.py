from pydantic import BaseSettings

class Settings(BaseSettings):
    MONGODB_URL: str = "mongodb://localhost:27017"
    DB_NAME: str = "styleswipe"

    class Config:
        env_file = ".env"

settings = Settings()
