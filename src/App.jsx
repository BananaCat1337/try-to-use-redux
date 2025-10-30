import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./shared/Header";
import AppRoutes from "./utils/AppRoutes";
function App() {
        return (
                <>
                        <Header />
                        <AppRoutes />
                </>
        );
}

export default App;

