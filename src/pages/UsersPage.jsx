import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../utils/api";
import { setUsers } from "../slices/ArticleSlice";
import usersBackup from "../backups/usersBackup";
export default function UsersPage() {
        const dispatch = useDispatch();
        const { users } = useSelector(({ article }) => article);
        useEffect(() => {
                async function fetchData() {
                        const responce = await API.getPhotos();
                        if (!responce) {
                                return;
                        } else {
                                dispatch(setUsers(responce));
                        }
                }
                dispatch(setUsers(usersBackup));
                fetchData();
        }, []);
        return (
                <>
                        <div className="flex justify-center items-center h-full ">
                                <div className="flex flex-col h-full items-center w-[90%] gap-2">
                                        <div className=""></div>
                                        <div className="flex justify-between w-[80%] gap-5">
                                                <h2 className="font-bold text-[32px]">Users List</h2>
                                                <div className="flex gap-2">
                                                        <button className="bg-blue-500 text-white flex justify-center items-center px-4">Make Big Cards</button>
                                                        <button className="bg-blue-500 text-white flex justify-center items-center px-4">Add Articles</button>
                                                </div>
                                        </div>
                                        <div className="flex justify-center items-center h-full">
                                                <div className="flex flex-col  h-full items-center w-[80%]">
                                                        <div className="flex flex-wrap items-center justify-center gap-5 w-full h-full">
                                                                {users.map((el) => (
                                                                        <div className="flex basis-[30%] flex-1 h-[28%] bg-[rgb(204,204,204)] justify-center items-center">
                                                                                <div className="flex flex-col w-[90%] h-[70%] justify-around ">
                                                                                        <div className="h-[70%]">
                                                                                                <div className="line-clamp-1 font-bold text-[32px] w-[60%]">{el.title}</div>
                                                                                        </div>
                                                                                        <div className="flex text-[rgb(126,127,131)] w-[40%] h-[17%] border border-[rgb(126,127,131)] rounded-sm">
                                                                                                <div className="border-r border-[rgb(126,127,131)] w-[30%] flex justify-center items-center">View</div>
                                                                                                <div className="w-[70%] flex justify-center items-center ">Change Color</div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                ))}
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </>
        );
}
