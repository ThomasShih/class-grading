import uvicorn
from fastapi import Depends, FastAPI
from pydantic import BaseModel
from sqlalchemy import text

from .router_dependicies import async_connection

app = FastAPI()


@app.get("/")
async def helloworld(connection=Depends(async_connection)):
    result = await connection.execute(text("SELECT 1"))
    return "helloworl!" + str(result.first()[0])


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
