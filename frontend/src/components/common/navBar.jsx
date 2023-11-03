import React from "react";
import { Link } from "react-router-dom";

import "./styles/navBar.css";

const NavBar = (props) => {
    const { active } = props;

    return (
        <React.Fragment>
            <div className="nav-container">
                <nav className="navbar">
                    <div className="nav-background">
                        <ul className="nav-list">
                            <li
                                className={
                                    active === "courses"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link to="/">Courses</Link>
                            </li>
                            <li
                                className={
                                    active === "students"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link to="/students">Students</Link>
                            </li>
                            <li
                                className={
                                    active === "course-results"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link to="/course-results">Course Results</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </React.Fragment>
    );
};

export default NavBar;