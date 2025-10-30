import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setSlicedPosts, showMorePosts, toggleCardsSize, setSelectedPost, changePostColor } from "../slices/ArticleSlice";
import postBackup from "../backups/postsBackup";

export default function Home() {
        const dispatch = useDispatch();
        const { posts, slicedPosts, showButton, btnText, bigCards, selectedPost, postColors } = useSelector(({ article }) => article);
        const [isModalOpen, setIsModalOpen] = useState(false);

        useEffect(() => {
                async function fetchData() {
                        const responce = await API.getPosts();
                        if (!responce) {
                                return;
                        } else {
                                dispatch(setPosts(responce));
                        }
                }
                dispatch(setPosts(postBackup));
                fetchData();
        }, []);

        const handleViewClick = (post) => {
                dispatch(setSelectedPost(post));
                setIsModalOpen(true);
        };

        const handleColorChange = (postId) => {
                dispatch(changePostColor({ postId }));
        };

        const closeModal = () => {
                setIsModalOpen(false);
                dispatch(setSelectedPost(null));
        };

        const handleBackdropClick = (e) => {
                if (e.target === e.currentTarget) {
                        closeModal();
                }
        };

        return (
                <>
                        <div className={`flex justify-center items-center h-full ${isModalOpen ? 'opacity-50' : ''}`}>
                                <div className="flex flex-col h-full items-center w-[90%] gap-2">
                                        <div></div>
                                        <div className="flex justify-between w-[80%] gap-5">
                                                <h2 className="font-bold text-[32px]">Article List</h2>
                                                <div className="flex gap-2">
                                                        <button
                                                                className="bg-blue-500 text-white flex justify-center items-center px-4"
                                                                onClick={() => dispatch(toggleCardsSize())}
                                                        >
                                                                {bigCards ? "Make Small Cards" : "Make Big Cards"}
                                                        </button>
                                                        <button className="bg-blue-500 text-white flex justify-center items-center px-4">Add Articles</button>
                                                </div>
                                        </div>
                                        <div className="flex justify-center items-center h-full">
                                                <div className="flex flex-col h-full items-center w-[80%]">
                                                        <div className="flex flex-wrap items-center justify-center gap-5 w-full h-full">
                                                                {slicedPosts.map((el) => (
                                                                        <div className={`flex ${bigCards ? "basis-[48%]" : "basis-[30%]"} h-[28%] ${postColors[el.id] || 'bg-[rgb(204,204,204)]'} justify-center items-center`}>
                                                                                <div className="flex flex-col w-[90%] h-[70%] justify-around">
                                                                                        <div className="h-[70%]">
                                                                                                <div className="line-clamp-1 font-bold text-[32px] w-[60%]">{el.title}</div>
                                                                                                <div className="line-clamp-3 w-[70%]">{el.body}</div>
                                                                                        </div>
                                                                                        <div className="flex text-[rgb(126,127,131)] w-[40%] h-[17%] border border-[rgb(126,127,131)] rounded-sm">
                                                                                                <div
                                                                                                        className="border-r border-[rgb(126,127,131)] w-[30%] flex justify-center items-center cursor-pointer select-none"
                                                                                                        onClick={() => handleViewClick(el)}
                                                                                                >
                                                                                                        View
                                                                                                </div>
                                                                                                <div
                                                                                                        className="w-[70%] flex justify-center items-center cursor-pointer select-none"
                                                                                                        onClick={() => handleColorChange(el.id)}
                                                                                                >
                                                                                                        Change Color
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                ))}
                                                                {showButton && (
                                                                        <div className="cursor-pointer bg-blue-500 rounded-lg px-8 py-3 text-gray-700 font-medium select-none">
                                                                                <button
                                                                                        className="cursor-pointer"
                                                                                        onClick={() => {
                                                                                                dispatch(showMorePosts());
                                                                                        }}
                                                                                >
                                                                                        Show More
                                                                                </button>
                                                                        </div>
                                                                )}
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        {isModalOpen && selectedPost && (
                                <div
                                        className="fixed inset-0 flex justify-center items-center z-50 p-4"
                                        onClick={handleBackdropClick}
                                >
                                        <div className="bg-white rounded-lg w-full max-w-2xl border border-gray-300 shadow-xl relative">
                                                <button
                                                        onClick={closeModal}
                                                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                                                >
                                                </button>
                                                <div className="p-6 border-b border-gray-300">
                                                        <h3 className="text-xl font-bold">Article Info</h3>
                                                </div>
                                                <div className="p-6">
                                                        <div className="mb-4">
                                                                <h4 className="font-semibold text-lg mb-2">{selectedPost.title}</h4>
                                                        </div>
                                                        <div>
                                                                <p className="text-gray-800 whitespace-pre-line">
                                                                        {selectedPost.body}
                                                                </p>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        )}
                </>
        );
}