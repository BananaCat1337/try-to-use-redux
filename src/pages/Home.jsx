import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setBigCards, decrementN, setSlicedPosts, setN, showMorePosts, setSelectedPost, changePostColor, addPost, updatePost, deletePost } from "../slices/ArticleSlice";
import postBackup from "../backups/postsBackup";

export default function Home() {
        const dispatch = useDispatch();
        const { posts, slicedPosts, showButton, btnText, n, bigCards, selectedPost, postColors, initialMaxId } = useSelector(({ article }) => article);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [isFormModalOpen, setIsFormModalOpen] = useState(false);
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
        const [editingPost, setEditingPost] = useState(null);
        const [deletingPostId, setDeletingPostId] = useState(null);
        const [formData, setFormData] = useState({ title: '', body: '' });

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

        const openAddModal = () => {
                setFormData({ title: '', body: '' });
                setEditingPost(null);
                setIsFormModalOpen(true);
        };

        const openEditModal = (post) => {
                setFormData({ title: post.title, body: post.body });
                setEditingPost(post);
                setIsFormModalOpen(true);
        };

        const closeFormModal = () => {
                setIsFormModalOpen(false);
                setFormData({ title: '', body: '' });
                setEditingPost(null);
        };

        const handleFormBackdropClick = (e) => {
                if (e.target === e.currentTarget) {
                        closeFormModal();
                }
        };

        const handleFormSubmit = (e) => {
                e.preventDefault();
                if (editingPost) {
                        dispatch(updatePost({ id: editingPost.id, title: formData.title, body: formData.body }));
                } else {
                        dispatch(addPost({ title: formData.title, body: formData.body }));
                }
                closeFormModal();
        };

        const openDeleteModal = (postId) => {
                setDeletingPostId(postId);
                setIsDeleteModalOpen(true);
        };

        const closeDeleteModal = () => {
                setIsDeleteModalOpen(false);
                setDeletingPostId(null);
        };

        const handleDeleteBackdropClick = (e) => {
                if (e.target === e.currentTarget) {
                        closeDeleteModal();
                }
        };

        const handleDeleteConfirm = () => {
                if (deletingPostId) {
                        dispatch(deletePost({ id: deletingPostId }));
                        closeDeleteModal();
                }
        };

        useEffect(() => {

        }, [bigCards])

        return (
                <>
                        <div className={`flex justify-center items-center h-full ${(isModalOpen || isFormModalOpen || isDeleteModalOpen) ? 'opacity-50' : ''}`}>
                                <div className="flex flex-col h-full items-center w-[90%] gap-2">
                                        <div></div>
                                        <div className="flex justify-between w-[80%] gap-5">
                                                <h2 className="font-bold text-[32px]">Article List</h2>
                                                <div className="flex gap-2">
                                                        <button
                                                                className="bg-blue-500 text-white flex justify-center items-center px-4"
                                                                onClick={() => {
                                                                        let count = slicedPosts.length;
                                                                        if (!bigCards) {
                                                                                count = count % 2 === 0 ? count : count - 1; 
                                                                                if (count === 0) count = 2;
                                                                                dispatch(setBigCards(true));
                                                                                dispatch(setN(count));
                                                                                dispatch(setSlicedPosts(posts.slice(0, count)));
                                                                        } else {
                                                                                count = Math.floor(count / 3) * 3; 
                                                                                if (count === 0) count = 3;
                                                                                dispatch(setBigCards(false));
                                                                                dispatch(setN(count));
                                                                                dispatch(setSlicedPosts(posts.slice(0, count)));
                                                                        }
                                                                }}
                                                        >
                                                        {bigCards ? "Make Small Cards" : "Make Big Cards"}
                                                </button>
                                                <button 
                                                        className="bg-blue-500 text-white flex justify-center items-center px-4"
                                                        onClick={openAddModal}
                                                >
                                                        Add Articles
                                                </button>
                                        </div>
                                </div>
                                <div className="flex justify-center items-center h-full">
                                        <div className="flex flex-col h-full items-center w-[80%]">
                                                <div className="flex flex-wrap items-center justify-center gap-5 w-full h-full">
                                                        {slicedPosts.map((el) => (
                                                                <div className={`flex ${bigCards ? "basis-[48%]" : "basis-[30%]"} min-h-[200px] ${bigCards ? 'h-[45%]' : 'h-[28%]'} ${postColors[el.id] || 'bg-[rgb(204,204,204)]'} justify-center items-center`}>
                                                                        <div className="flex flex-col w-[90%] h-[70%] justify-around">
                                                                                <div className="h-[70%]">
                                                                                        <div className="line-clamp-1 font-bold text-[32px] w-[60%]">{el.title}</div>
                                                                                        <div className="line-clamp-3 w-[70%]">{el.body}</div>
                                                                                </div>
                                                                                <div className="flex text-[rgb(126,127,131)] w-[100%] h-[17%] border border-[rgb(126,127,131)] rounded-sm">
                                                                                        <div
                                                                                                className={`border-r border-[rgb(126,127,131)] ${el.id > initialMaxId ? 'w-[20%]' : 'w-[50%]'} flex justify-center items-center cursor-pointer select-none`}
                                                                                                onClick={() => handleViewClick(el)}
                                                                                        >
                                                                                                View
                                                                                        </div>
                                                                                        {el.id > initialMaxId ? (
                                                                                                <>
                                                                                                        <div
                                                                                                                className="border-r border-[rgb(126,127,131)] w-[20%] flex justify-center items-center cursor-pointer select-none"
                                                                                                                onClick={() => handleColorChange(el.id)}
                                                                                                        >
                                                                                                                Change Color
                                                                                                        </div>
                                                                                                        <div
                                                                                                                className="border-r border-[rgb(126,127,131)] w-[20%] flex justify-center items-center cursor-pointer select-none"
                                                                                                                onClick={() => openEditModal(el)}
                                                                                                        >
                                                                                                                Edit
                                                                                                        </div>
                                                                                                        <div
                                                                                                                className="w-[40%] flex justify-center items-center cursor-pointer select-none"
                                                                                                                onClick={() => openDeleteModal(el.id)}
                                                                                                        >
                                                                                                                Delete
                                                                                                        </div>
                                                                                                </>
                                                                                        ) : (
                                                                                                <div
                                                                                                        className="w-[50%] flex justify-center items-center cursor-pointer select-none"
                                                                                                        onClick={() => handleColorChange(el.id)}
                                                                                                >
                                                                                                        Change Color
                                                                                                </div>
                                                                                        )}
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
                </div >

                        { isModalOpen && selectedPost && (
                                <div
                                        className="fixed inset-0 flex justify-center items-center z-50 p-4"
                                        onClick={handleBackdropClick}
                                >
                                        <div className="bg-white rounded-lg w-full max-w-2xl border border-gray-300 shadow-xl relative">
                                                <button
                                                        onClick={closeModal}
                                                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                                                >
                                                        ×
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

                        { isFormModalOpen && (
                                <div
                                        className="fixed inset-0 flex justify-center items-center z-50 p-4"
                                        onClick={handleFormBackdropClick}
                                >
                                        <div className="bg-white rounded-lg w-full max-w-2xl border border-gray-300 shadow-xl relative">
                                                <button
                                                        onClick={closeFormModal}
                                                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                                                >
                                                        ×
                                                </button>
                                                <div className="p-6 border-b border-gray-300">
                                                        <h3 className="text-xl font-bold">
                                                                {editingPost ? 'Edit Article' : 'Create Article'}
                                                        </h3>
                                                </div>
                                                <form onSubmit={handleFormSubmit} className="p-6">
                                                        <div className="mb-4">
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Title
                                                                </label>
                                                                <input
                                                                        type="text"
                                                                        value={formData.title}
                                                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                        required
                                                                />
                                                        </div>
                                                        <div className="mb-4">
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Body
                                                                </label>
                                                                <textarea
                                                                        value={formData.body}
                                                                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                        rows="6"
                                                                        required
                                                                />
                                                        </div>
                                                        <div className="flex justify-end gap-2">
                                                                <button
                                                                        type="button"
                                                                        onClick={closeFormModal}
                                                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                                                >
                                                                        Cancel
                                                                </button>
                                                                <button
                                                                        type="submit"
                                                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                                                >
                                                                        {editingPost ? 'Update' : 'Create'}
                                                                </button>
                                                        </div>
                                                </form>
                                        </div>
                                </div>
                        )}

                        { isDeleteModalOpen && (
                                <div
                                        className="fixed inset-0 flex justify-center items-center z-50 p-4"
                                        onClick={handleDeleteBackdropClick}
                                >
                                        <div className="bg-white rounded-lg w-full max-w-md border border-gray-300 shadow-xl relative">
                                                <div className="p-6 border-b border-gray-300">
                                                        <h3 className="text-xl font-bold">Confirm Delete</h3>
                                                </div>
                                                <div className="p-6">
                                                        <p className="text-gray-800 mb-4">
                                                                Do you really want to delete this card?
                                                        </p>
                                                        <div className="flex justify-end gap-2">
                                                                <button
                                                                        onClick={closeDeleteModal}
                                                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                                                >
                                                                        No
                                                                </button>
                                                                <button
                                                                        onClick={handleDeleteConfirm}
                                                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                                >
                                                                        Yes
                                                                </button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        )}
                </>
        );
}