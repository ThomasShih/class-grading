import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import axios from "axios";
import NavBar from "../components/common/navBar";
import NewStudent from "../components/common/newStudent";

import "./styles/page.css";

const getStudents = async () => {
    const response = await axios.get("http://localhost:8000/students/");
    return response.data;
}

const deleteStudent = async (student_id) => {
    const response = await axios.delete(`http://localhost:8000/students/${student_id}/`);
    return response.data;
}

const Students = () => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
        getStudents().then((students) => {
            setStudents(students);
        });
    }, []);

    const onDelete = (student_id) => {
        deleteStudent(student_id).then(() => {
            getStudents().then((students) => {
                setStudents(students);
            });
        });
    };

    const refresh = () => {
        getStudents().then((students) => {
            setStudents(students);
        });
    }

    const theme = useTheme(getTheme());
    const columns = [
        {
            label: "Student Name",
            renderCell: (row) => row.student_name
        },
        {
            label: "Delete Student",
            renderCell: (row) => <button onClick={() => onDelete(row.student_id)}>Delete</button>
        }
    ];

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Students`}</title>
            </Helmet>
            <NavBar active="students" />
            <div className="page-content">
                <div className="content-wrapper">
                    <div className="projects-container">
                        <div className="title projects-title">
                            Students
                        </div>
                        <NewStudent refresh={refresh} />
                        <CompactTable columns={columns} data={{ nodes: students }} theme={theme} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Students;