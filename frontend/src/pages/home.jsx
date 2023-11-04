import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import NavBar from "../components/common/navBar";
import "./styles/page.css";


const Home = () => {
    return (
        <React.Fragment>
            <Helmet>
                <title>{`Home`}</title>
            </Helmet>
            <NavBar active="home" />
            <div className="page-content">
                <div className="content-wrapper">
                    <div className="projects-container">
                        To add a course, student, or course result, click on the corresponding tab in the navigation bar.
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;