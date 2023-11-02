from fastapi import APIRouter, Depends
from sqlalchemy import insert, select, delete
from ..router_dependicies import async_connection
from ..models import Course, CourseCreate
from ..orm import CourseOrm

courses_router = APIRouter()


@courses_router.post("/", response_model=Course)
async def create_course(
    course: CourseCreate,
    connection=Depends(async_connection),
):
    insert_stmt = (
        insert(CourseOrm).values(course_name=course.course_name).returning(CourseOrm)
    )

    course_id = (await connection.execute(insert_stmt)).first()[0]

    return Course(
        course_id=course_id,
        course_name=course.course_name,
    )


@courses_router.get("/", response_model=list[Course])
async def get_courses(
    connection=Depends(async_connection),
):
    select_stmt = select(CourseOrm)
    courses = (await connection.execute(select_stmt)).all()

    return courses


@courses_router.delete("/{id}")
async def delete_course(
    id: int,
    connection=Depends(async_connection),
):
    delete_stmt = delete(CourseOrm).where(CourseOrm.course_id == id)
    await connection.execute(delete_stmt)
