import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import About from "./pages/About";
import App from "./pages/App";
import Results from "./pages/Results";

const Layout = () => {
    return (
        <>
            <BrowserRouter>
                <div className="nav">
                    <Link to="/">Dissector</Link>
                    <Link to="/results">Bot</Link>
                    <Link to="/about">About</Link>
                </div>
                <Routes>
                    <Route element={<App />} path="/" />
                    <Route element={<Results />} path="/results" />
                    <Route element={<About />} path="/about" />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default Layout;