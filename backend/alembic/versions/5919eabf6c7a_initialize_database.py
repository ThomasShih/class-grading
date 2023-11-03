"""Initialize Database

Revision ID: 5919eabf6c7a
Revises: 
Create Date: 2023-11-01 17:38:24.106713

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "5919eabf6c7a"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "students",
        sa.Column("student_id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("first_name", sa.String(255), nullable=False),
        sa.Column("last_name", sa.String(255), nullable=False),
        sa.Column("date_of_birth", sa.Date, nullable=False),
        sa.Column("email_address", sa.String(255), nullable=False),
    )
    op.create_table(
        "courses",
        sa.Column("course_id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("course_name", sa.String(255), nullable=False),
    )
    op.create_table(
        "student_course_association",
        sa.Column(
            "course_id", sa.Integer, sa.ForeignKey("courses.course_id"), nullable=False
        ),
        sa.Column(
            "student_id",
            sa.Integer,
            sa.ForeignKey("students.student_id"),
            nullable=False,
        ),
        sa.Column("score", sa.String(255), nullable=True),
    )


def downgrade() -> None:
    op.drop_table("student_course_association")
    op.drop_table("courses")
    op.drop_table("students")
