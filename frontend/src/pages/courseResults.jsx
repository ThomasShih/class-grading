import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/common/navBar";
import NewCourseResult from "../components/common/newCourseResults";
import { getCourseResults, deleteCourseResult, getCourses, getStudents } from "../api";

import "./styles/page.css";
import DataTable from "../components/common/dataTable";

const CourseResults = () => {
    const [courseResults, setCourseResults] = useState([]);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
        getCourseResults().then((courseResults) => {
            setCourseResults(courseResults);
        });
        getCourses().then((courses) => {
            setCourses(courses);
        });
        getStudents().then((students) => {
            setStudents(students);
        });
    }, []);

    const refresh = () => {
        getCourseResults().then((courseResults) => {
            setCourseResults(courseResults);
        });
    }

    const onDelete = async (course_id, student_id) => {
        await deleteCourseResult(course_id, student_id);
        const results = await getCourseResults();
        setCourseResults(results);
    }

    const get_course_name = (course_id) => {
        return courses.find((course) => course.course_id === course_id).course_name;
    }

    const get_student_name = (student_id) => {
        const student = students.find((student) => student.student_id === student_id);
        return `${student.first_name} ${student.last_name}`
    }

    const columns = [
        {
            label: "Course",
            renderCell: (row) => get_course_name(row.course_id)
        },
        {
            label: "Student",
            renderCell: (row) => get_student_name(row.student_id)
        },
        {
            label: "Score",
            renderCell: (row) => row.score
        },
        {
            label: "Delete Result",
            renderCell: (row) => <button onClick={() => onDelete(row.course_id, row.student_id)}>Delete</button>
        }
    ];

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Course Results`}</title>
            </Helmet>
            <Navbar active="course-results" />
            <div className="page-content">
                <div className="content-wrapper">
                    <div className="projects-container">
                        <div className="title projects-title">
                            Course Results
                        </div>
                        <NewCourseResult courses={courses} students={students} refresh={refresh} />
                        <DataTable rows={courseResults} columns={columns} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CourseResults;