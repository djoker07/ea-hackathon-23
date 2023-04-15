import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import Results from "./pages/Results";

const Layout = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<App />} path="/" />
                    <Route element={<Results />} path="/results" />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default Layout;