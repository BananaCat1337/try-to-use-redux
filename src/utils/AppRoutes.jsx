import React from "react";
import { Routes, Route } from "react-router-dom";
import Photos from "../pages/Photos";
import Home from "../pages/Home";
import UsersPage from "../pages/UsersPage";
export default function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/photos" element={<Photos />} />
            </Routes>
        </>
    );
}
