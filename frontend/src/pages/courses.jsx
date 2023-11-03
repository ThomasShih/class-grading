import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import NavBar from "../components/common/navBar";
import NewCourse from "../components/common/newCourse";
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

	const theme = useTheme(getTheme());
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
						<CompactTable columns={columns} data={{ nodes: courses }} theme={theme} />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Courses;