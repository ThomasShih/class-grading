import sqlalchemy
from sqlalchemy.ext.asyncio import create_async_engine

DATABASE_URL = "postgresql+asyncpg://postgres:postgres@db:5432/postgres"

engine = create_async_engine(DATABASE_URL)


async def async_connection():
    async with engine.connect() as conn:
        yield conn
