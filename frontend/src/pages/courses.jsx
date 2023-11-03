import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import NavBar from "../components/common/navBar";

import "./styles/page.css";

const Courses = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Courses;