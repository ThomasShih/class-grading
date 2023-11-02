from fastapi import Depends, APIRouter
from pydantic import BaseModel
from sqlalchemy import text

from ..router_dependicies import async_connection

from .courses import courses_router
from .students import students_router
from .results import results_router

root_router = APIRouter()
root_router.include_router(courses_router, prefix="/courses")
root_router.include_router(students_router, prefix="/students")
root_router.include_router(results_router, prefix="/results")
