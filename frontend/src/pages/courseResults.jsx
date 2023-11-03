import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/common/navBar";

import "./styles/page.css";

const CourseResults = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CourseResults;