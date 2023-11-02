from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


@app.get("")
async def helloworld():
    return "helloworld!"
