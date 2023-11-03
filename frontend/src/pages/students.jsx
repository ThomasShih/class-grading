import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import NavBar from "../components/common/navBar";
import NewStudent from "../components/common/newStudent";
import { getStudents, deleteStudent } from "../api";
import "./styles/page.css";
import DataTable from "../components/common/dataTable";


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

    const columns = [
        {
            label: "Name & Family name",
            renderCell: (row) => `${row.first_name} ${row.last_name}`
        },
        {
            label: "DOB",
            renderCell: (row) => row.date_of_birth
        },
        {
            label: "Email",
            renderCell: (row) => row.email_address
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
                        <DataTable rows={students} columns={columns} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Students;