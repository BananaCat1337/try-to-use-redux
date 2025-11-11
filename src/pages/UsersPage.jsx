import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setBigCards, setSlicedPosts, setN, showMorePosts, setSelectedUser, changePostColor, addUser, updateUser, deleteUser } from "../slices/ArticleSlice";

export default function UsersPage() {
        const dispatch = useDispatch();
        const { users, slicedPosts, showButton, n, bigCards, selectedUser, postColors, initialMaxId } = useSelector(({ article }) => article);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [isFormModalOpen, setIsFormModalOpen] = useState(false);
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
        const [editingUser, setEditingUser] = useState(null);
        const [deletingUserId, setDeletingUserId] = useState(null);
        const [formData, setFormData] = useState({ name: '', username: '', email: '', phone: '', website: '' });

        useEffect(() => {
                async function fetchData() {
                        const responce = await API.getUsers();
                        if (!responce) {
                                return;
                        } else {
                                dispatch(setUsers(responce));
                        }
                }
                fetchData();
        }, []);

        const handleViewClick = (user) => {
                dispatch(setSelectedUser(user));
                setIsModalOpen(true);
        };

        const handleColorChange = (userId) => {
                dispatch(changePostColor({ postId: userId }));
        };

        const closeModal = () => {
                setIsModalOpen(false);
                dispatch(setSelectedUser(null));
        };

        const handleBackdropClick = (e) => {
                if (e.target === e.currentTarget) {
                        closeModal();
                }
        };

        const openAddModal = () => {
                setFormData({ name: '', username: '', email: '', phone: '', website: '' });
                setEditingUser(null);
                setIsFormModalOpen(true);
        };

        const openEditModal = (user) => {
                setFormData({ name: user.name, username: user.username, email: user.email, phone: user.phone, website: user.website });
                setEditingUser(user);
                setIsFormModalOpen(true);
        };

        const closeFormModal = () => {
                setIsFormModalOpen(false);
                setFormData({ name: '', username: '', email: '', phone: '', website: '' });
                setEditingUser(null);
        };

        const handleFormBackdropClick = (e) => {
                if (e.target === e.currentTarget) {
                        closeFormModal();
                }
        };

        const handleFormSubmit = (e) => {
                e.preventDefault();
                if (editingUser) {
                        dispatch(updateUser({ id: editingUser.id, name: formData.name, username: formData.username, email: formData.email, phone: formData.phone, website: formData.website }));
                } else {
                        dispatch(addUser({ name: formData.name, username: formData.username, email: formData.email, phone: formData.phone, website: formData.website }));
                }
                closeFormModal();
        };

        const openDeleteModal = (userId) => {
                setDeletingUserId(userId);
                setIsDeleteModalOpen(true);
        };

        const closeDeleteModal = () => {
                setIsDeleteModalOpen(false);
                setDeletingUserId(null);
        };

        const handleDeleteBackdropClick = (e) => {
                if (e.target === e.currentTarget) {
                        closeDeleteModal();
                }
        };

        const handleDeleteConfirm = () => {
                if (deletingUserId) {
                        dispatch(deleteUser({ id: deletingUserId }));
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
                                                <h2 className="font-bold text-[32px]">Users List</h2>
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
                                                                                dispatch(setSlicedPosts(users.slice(0, count)));
                                                                        } else {
                                                                                count = Math.floor(count / 3) * 3; 
                                                                                if (count === 0) count = 3;
                                                                                dispatch(setBigCards(false));
                                                                                dispatch(setN(count));
                                                                                dispatch(setSlicedPosts(users.slice(0, count)));
                                                                        }
                                                                }}
                                                        >
                                                                {bigCards ? "Make Small Cards" : "Make Big Cards"}
                                                        </button>
                                                        <button 
                                                                className="bg-blue-500 text-white flex justify-center items-center px-4"
                                                                onClick={openAddModal}
                                                        >
                                                                Add Users
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
                                                                                                <div className="line-clamp-1 font-bold text-[32px] w-[60%]">{el.name}</div>
                                                                                                <div className="line-clamp-1 text-[18px] w-[70%]">{el.email}</div>
                                                                                                <div className="line-clamp-1 text-[16px] w-[70%]">{el.phone}</div>
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
                        </div>

                        { isModalOpen && selectedUser && (
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
                                                        <h3 className="text-xl font-bold">User Info</h3>
                                                </div>
                                                <div className="p-6">
                                                        <div className="mb-4">
                                                                <h4 className="font-semibold text-lg mb-2">{selectedUser.name}</h4>
                                                        </div>
                                                        <div>
                                                                <p className="text-gray-800 whitespace-pre-line">
                                                                        <strong>Username:</strong> {selectedUser.username}<br />
                                                                        <strong>Email:</strong> {selectedUser.email}<br />
                                                                        <strong>Phone:</strong> {selectedUser.phone}<br />
                                                                        <strong>Website:</strong> {selectedUser.website}
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
                                                                {editingUser ? 'Edit User' : 'Create User'}
                                                        </h3>
                                                </div>
                                                <form onSubmit={handleFormSubmit} className="p-6">
                                                        <div className="mb-4">
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Name
                                                                </label>
                                                                <input
                                                                        type="text"
                                                                        value={formData.name}
                                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                        required
                                                                />
                                                        </div>
                                                        <div className="mb-4">
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Username
                                                                </label>
                                                                <input
                                                                        type="text"
                                                                        value={formData.username}
                                                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                        required
                                                                />
                                                        </div>
                                                        <div className="mb-4">
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Email
                                                                </label>
                                                                <input
                                                                        type="email"
                                                                        value={formData.email}
                                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                        required
                                                                />
                                                        </div>
                                                        <div className="mb-4">
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Phone
                                                                </label>
                                                                <input
                                                                        type="tel"
                                                                        value={formData.phone}
                                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                        required
                                                                />
                                                        </div>
                                                        <div className="mb-4">
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Website
                                                                </label>
                                                                <input
                                                                        type="text"
                                                                        value={formData.website}
                                                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                                                        {editingUser ? 'Update' : 'Create'}
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
