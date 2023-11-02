import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


@app.get("")
async def helloworld():
    return "helloworld!"


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
