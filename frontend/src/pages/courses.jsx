import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import NavBar from "../components/common/navBar";
import NewCourse from "../components/common/newCourse";
import DataTable from "../components/common/dataTable";
import { getCourses, deleteCourse } from "../api";
import "./styles/page.css";

const Courses = () => {
	const [courses, setCourses] = useState([]);
	useEffect(() => {
		window.scrollTo(0, 0);
		getCourses().then((courses) => {
			setCourses(courses);
		});
	}, []);

	const onDelete = (course_id) => {
		deleteCourse(course_id).then(() => {
			getCourses().then((courses) => {
				setCourses(courses);
			});
		});
	};

	const refresh = () => {
		getCourses().then((courses) => {
			setCourses(courses);
		});
	}

	const columns = [
		{
			label: "Course Name",
			renderCell: (row) => row.course_name
		},
		{
			label: "Delete Course",
			renderCell: (row) => <button onClick={() => onDelete(row.course_id)}>Delete</button>
		}
	];

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Courses`}</title>
			</Helmet>
			<NavBar active="courses" />
			<div className="page-content">
				<div className="content-wrapper">
					<div className="projects-container">
						<div className="title projects-title">
							Courses
						</div>
						<NewCourse refresh={refresh} />
						<DataTable columns={columns} rows={courses} />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Courses;