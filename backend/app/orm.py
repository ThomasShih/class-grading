from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class StudentOrm(Base):
    __tablename__ = "students"
    student_id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    date_of_birth = Column(Date, nullable=False)
    email_address = Column(String(255), nullable=False)


class CourseOrm(Base):
    __tablename__ = "courses"
    course_id = Column(Integer, primary_key=True, autoincrement=True)
    course_name = Column(String(255), nullable=False)


class StudentCourseAssociationOrm(Base):
    __tablename__ = "student_course_association"
    course_id = Column(
        Integer, ForeignKey("courses.course_id"), nullable=False, primary_key=True
    )
    student_id = Column(
        Integer, ForeignKey("students.student_id"), nullable=False, primary_key=True
    )
    score = Column(String(255), nullable=True)
