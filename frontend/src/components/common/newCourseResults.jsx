import React, { useState } from 'react';
import { ReactDialogBox } from 'react-js-dialog-box';
import 'react-js-dialog-box/dist/index.css';

import { createCourseResult } from '../../api';

function NewCourseResult({ students, courses, refresh }) {
    const [grade, setGrade] = useState('');
    const [studentId, setStudentId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createCourseResult(studentId, courseId, grade);
        refresh();
        setShowForm(false);
    }

    const student_options = students.map((student) => {
        return <option value={student.student_id}>{`${student.first_name} ${student.last_name}`}</option>
    })

    const course_options = courses.map((course) => {
        return <option value={course.course_id}>{course.course_name}</option>
    })

    return (
        <div>
            <button onClick={() => setShowForm(true)}>Add New Course</button>
            {showForm && (
                <ReactDialogBox
                    closeBox={() => { setShowForm(false); setGrade(''); }}
                    modalWidth='60%'
                    headerBackgroundColor='red'
                    headerTextColor='white'
                    headerHeight='65'
                    closeButtonColor='white'
                    bodyBackgroundColor='white'
                    bodyTextColor='black'
                    bodyHeight='200px'
                    headerText='New Course'
                >
                    <form onSubmit={handleSubmit}>
                        <label>
                            Student:
                            <select value={studentId} onChange={(event) => setStudentId(event.target.value)}>
                                {student_options}
                            </select>
                        </label>
                        <label>
                            Course:
                            <select value={courseId} onChange={(event) => setCourseId(event.target.value)}>
                                {course_options}
                            </select>
                        </label>
                        <label>
                            Grade:
                            <select value={grade} onChange={(event) => setGrade(event.target.value)}>
                                <option value="">Select a grade</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                            </select>
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </ReactDialogBox>
            )
            }
        </div >
    );
}

export default NewCourseResult;
