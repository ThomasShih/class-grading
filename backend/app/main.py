import uvicorn
from fastapi import FastAPI
from .api import root_router


app = FastAPI()
app.include_router(root_router, prefix="")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
