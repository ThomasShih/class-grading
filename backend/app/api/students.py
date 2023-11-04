from fastapi import APIRouter, Depends
from sqlalchemy import insert, select, delete
from ..router_dependicies import async_connection
from ..models import Student, StudentCreate
from ..orm import StudentCourseAssociationOrm, StudentOrm

students_router = APIRouter()


@students_router.post("/", response_model=Student)
async def create_student(
    student: StudentCreate,
    connection=Depends(async_connection),
):
    insert_stmt = (
        insert(StudentOrm).values(**student.model_dump()).returning(StudentOrm)
    )

    student_result = (await connection.execute(insert_stmt)).first()

    return Student.model_validate(student_result)


@students_router.get("/", response_model=list[Student])
async def get_students(
    connection=Depends(async_connection),
):
    select_stmt = select(StudentOrm)
    students = (await connection.execute(select_stmt)).all()

    return [Student.model_validate(student) for student in students]


@students_router.delete("/{id}")
async def delete_student(
    id: int,
    connection=Depends(async_connection),
):
    delete_grades_stmt = delete(StudentCourseAssociationOrm).where(
        StudentCourseAssociationOrm.student_id == id
    )
    await connection.execute(delete_grades_stmt)

    delete_stmt = delete(StudentOrm).where(StudentOrm.student_id == id)
    await connection.execute(delete_stmt)
