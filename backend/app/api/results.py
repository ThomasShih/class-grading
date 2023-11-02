from fastapi import APIRouter, Depends
from sqlalchemy import insert, select, delete
from ..router_dependicies import async_connection
from ..models import StudentCourseAssociation
from ..orm import StudentCourseAssociationOrm

results_router = APIRouter()


@results_router.get("/", response_model=list[StudentCourseAssociation])
async def get_results(
    student_id: int | None = None,
    course_id: int | None = None,
    connection=Depends(async_connection),
):
    select_stmt = select(StudentCourseAssociationOrm)

    if student_id is not None:
        select_stmt = select_stmt.where(
            StudentCourseAssociationOrm.student_id == student_id
        )

    if course_id is not None:
        select_stmt = select_stmt.where(
            StudentCourseAssociationOrm.course_id == course_id
        )

    results = (await connection.execute(select_stmt)).all()

    return [StudentCourseAssociation.model_validate(r) for r in results]


@results_router.post("/", response_model=StudentCourseAssociation)
async def create_result(
    result: StudentCourseAssociation,
    connection=Depends(async_connection),
):
    insert_stmt = (
        insert(StudentCourseAssociationOrm)
        .values(**result.model_dump())
        .returning(StudentCourseAssociationOrm)
    )

    result = (await connection.execute(insert_stmt)).first()

    return StudentCourseAssociation.model_validate(result)


@results_router.delete("/")
async def delete_results(
    student_id: int,
    course_id: int,
    connection=Depends(async_connection),
):
    delete_stmt = (
        delete(StudentCourseAssociationOrm)
        .where(StudentCourseAssociationOrm.student_id == student_id)
        .where(StudentCourseAssociationOrm.course_id == course_id)
    )
    await connection.execute(delete_stmt)
