import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
        const location = useLocation();
        
        return (
                <>
                        <div className="w-full h-[5%] bg-gray-600 flex gap-5 items-center text-white pl-3 ">
                                <div className="font-bold text-[20px]">React Example</div>
                                <Link to="/">
                                        <div className={`text-[18px] cursor-pointer ${location.pathname === '/' ? 'font-bold underline' : ''}`}>Home</div>
                                </Link>
                                <Link to="/users">
                                        <div className={`text-[18px] cursor-pointer ${location.pathname === '/users' ? 'font-bold underline' : ''}`}>Users</div>
                                </Link>
                                <Link to="/photos">
                                        <div className={`text-[18px] cursor-pointer ${location.pathname === '/photos' ? 'font-bold underline' : ''}`}>Photos</div>
                                </Link>
                        </div>
                </>
        );
}
