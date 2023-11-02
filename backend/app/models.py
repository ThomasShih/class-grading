from datetime import date
from pydantic import BaseModel


class CamelCasedModel(BaseModel):
    class Config:
        alias_generator = lambda string: string[0].lower() + string[1:]
        allow_population_by_field_name = True


class StudentBase(CamelCasedModel):
    first_name: str
    date_of_birth: date
    email_address: str


class StudentCreate(StudentBase):
    pass


class Student(StudentBase):
    student_id: int

    class Config:
        orm_mode = True


class CourseBase(CamelCasedModel):
    course_name: str


class CourseCreate(CourseBase):
    pass


class Course(CourseBase):
    course_id: int
    students: List[Student] = []

    class Config:
        orm_mode = True


class StudentCourseAssociationBase(CamelCasedModel):
    course_id: int
    student_id: int
    score: Optional[str] = None


class StudentCourseAssociationCreate(StudentCourseAssociationBase):
    pass


class StudentCourseAssociation(StudentCourseAssociationBase):
    pass

    class Config:
        orm_mode = True
