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

        </React.Fragment>
    );
};

export default Home;