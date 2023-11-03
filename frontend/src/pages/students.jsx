import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import Navbar from "../components/common/navBar";
import "./styles/page.css";

const Students = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Students`}</title>
            </Helmet>
            <Navbar active="students" />
            <div className="page-content">
                <div className="content-wrapper">
                    <div className="projects-container">
                        <div className="title projects-title">
                            Students
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Students;