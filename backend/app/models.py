from datetime import date
from typing import Optional
from pydantic import BaseModel, EmailStr, field_validator


class CamelCasedModel(BaseModel):
    class Config:
        alias_generator = lambda string: string[0].lower() + string[1:]
        populate_by_name = True
        from_attributes = True


class StudentCreate(CamelCasedModel):
    first_name: str
    last_name: str
    date_of_birth: date
    email_address: EmailStr

    @field_validator("date_of_birth")
    def validate_age(cls, v):
        age = (date.today() - v).days / 365
        if age < 10:
            raise ValueError("must be 10 or older")
        return v


class Student(StudentCreate):
    student_id: int


class CourseCreate(CamelCasedModel):
    course_name: str


class Course(CourseCreate):
    course_id: int
    students: list[Student] = []


class StudentCourseAssociation(CamelCasedModel):
    course_id: int
    student_id: int
    score: Optional[str] = None

    @field_validator("score")
    def validate_age(cls, v):
        if v not in ["A", "B", "C", "D", "E", "F"]:
            raise ValueError("must be A, B, C, D, or F")
        return v
