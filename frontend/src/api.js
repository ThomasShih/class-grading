import axios from 'axios';

const createCourse = async (courseName) => {
    const response = await axios.post('http://localhost:8000/courses/', {
        course_name: courseName,
    });
    return response.data;
}

const getCourses = async () => {
    const response = await axios.get("http://localhost:8000/courses/");
    return response.data;
}

const deleteCourse = async (course_id) => {
    const response = await axios.delete(`http://localhost:8000/courses/${course_id}/`);
    return response.data;
}

const createStudent = async (firstName, lastName, dateOfBirth, email) => {
    const response = await axios.post('http://localhost:8000/students', {
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        email_address: email,
    });
}

const getStudents = async () => {
    const response = await axios.get("http://localhost:8000/students/");
    return response.data;
}

const deleteStudent = async (student_id) => {
    const response = await axios.delete(`http://localhost:8000/students/${student_id}/`);
    return response.data;
}

export { createCourse, getCourses, deleteCourse, createStudent, getStudents, deleteStudent };
