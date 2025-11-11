import { createSlice } from "@reduxjs/toolkit";

export const articleSlice = createSlice({
        name: "Article",
        initialState: {
                posts: [],
                slicedPosts: [],
                photos: [],
                users: [],
                showButton: true,
                bigCards: false,
                n: 3,
                selectedPost: null,
                selectedUser: null,
                postColors: {},
                initialMaxId: 100,
        },
        reducers: {
                setPosts: (state, action) => {
                        const { payload } = action;
                        state.posts = payload;
                        state.slicedPosts = payload.slice(0, state.n);
                        state.showButton = payload.length > state.n;
                        if (payload.length > 0) {
                                const maxId = Math.max(...payload.map(p => p.id));
                                state.initialMaxId = maxId;
                        }
                },
                setUsers: (state, action) => {
                        const { payload } = action;
                        state.users = payload;
                        state.slicedPosts = payload.slice(0, state.n);
                        state.showButton = payload.length > state.n;
                        if (payload.length > 0) {
                                const maxId = Math.max(...payload.map(u => u.id));
                                state.initialMaxId = maxId;
                        }
                },
                setSelectedUser: (state, action) => {
                        state.selectedUser = action.payload;
                },
                addUser: (state, action) => {
                        const { name, username, email, phone, website } = action.payload;
                        const maxId = state.users.length > 0 
                                ? Math.max(...state.users.map(u => u.id)) 
                                : 0;
                        const newUser = {
                                id: maxId + 1,
                                name,
                                username,
                                email,
                                phone,
                                website,
                        };
                        state.users.push(newUser);
                        state.slicedPosts = state.users.slice(0, state.n);
                        state.showButton = state.users.length > state.n;
                },
                updateUser: (state, action) => {
                        const { id, name, username, email, phone, website } = action.payload;
                        const index = state.users.findIndex(u => u.id === id);
                        if (index !== -1) {
                                state.users[index] = { ...state.users[index], name, username, email, phone, website };
                                state.slicedPosts = state.users.slice(0, state.n);
                        }
                },
                deleteUser: (state, action) => {
                        const { id } = action.payload;
                        state.users = state.users.filter(u => u.id !== id);
                        state.slicedPosts = state.users.slice(0, state.n);
                        state.showButton = state.users.length > state.n;
                        if (state.n > state.users.length) {
                                state.n = state.users.length;
                                state.slicedPosts = state.users.slice(0, state.n);
                        }
                },
                setBtnText: (state, action) => {
                        const { payload } = action;
                        state.btnText = payload;
                },
                setPhotos: (state, action) => {
                        const { payload } = action;
                        state.photos = payload;
                },
                setSlicedPosts: (state, action) => {
                        const { payload } = action;
                        state.slicedPosts = payload;
                },
                setN: (state, action) => {
                        const { payload } = action;
                        state.n = payload;
                },
                setBigCards: (state, action) => {
                        const { payload } = action;
                        state.bigCards = payload;
                },
                showMorePosts: (state) => {
                        console.log(state.bigCards)
                        const increment = state.bigCards ? 2 : 3;
                        const newN = state.n + increment;
                        state.n = newN;

                        const data = state.posts.length >= state.users.length ? state.posts : state.users;
                        state.slicedPosts = data.slice(0, newN);

                        if (newN >= data.length) {
                                state.showButton = false;
                        }
                },
                resetPosts: (state) => {
                        state.n = 3;
                        state.slicedPosts = state.posts.slice(0, 3);
                        state.showButton = state.posts.length > 3;
                },
                decrementN: (state, action) => {
                        const { payload } = action;
                        state.n += payload
                },
                setSelectedPost: (state, action) => {
                        state.selectedPost = action.payload;
                },
                changePostColor: (state, action) => {
                        const { postId } = action.payload;
                        const colors = ['bg-[rgb(204,204,204)]', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200'];
                        const currentColor = state.postColors[postId] || colors[0];
                        const currentIndex = colors.indexOf(currentColor);
                        const nextIndex = (currentIndex + 1) % colors.length;
                        state.postColors[postId] = colors[nextIndex];
                },
                addPost: (state, action) => {
                        const { title, body } = action.payload;
                        const maxId = state.posts.length > 0 
                                ? Math.max(...state.posts.map(p => p.id)) 
                                : 0;
                        const newPost = {
                                id: maxId + 1,
                                title,
                                body,
                                userId: 1
                        };
                        state.posts.push(newPost);
                        state.slicedPosts = state.posts.slice(0, state.n);
                        state.showButton = state.posts.length > state.n;
                },
                updatePost: (state, action) => {
                        const { id, title, body } = action.payload;
                        const index = state.posts.findIndex(p => p.id === id);
                        if (index !== -1) {
                                state.posts[index] = { ...state.posts[index], title, body };
                                state.slicedPosts = state.posts.slice(0, state.n);
                        }
                },
                deletePost: (state, action) => {
                        const { id } = action.payload;
                        state.posts = state.posts.filter(p => p.id !== id);
                        state.slicedPosts = state.posts.slice(0, state.n);
                        state.showButton = state.posts.length > state.n;
                        if (state.n > state.posts.length) {
                                state.n = state.posts.length;
                                state.slicedPosts = state.posts.slice(0, state.n);
                        }
                },
        },
});

export const {
        setPosts,
        setUsers,
        setPhotos,
        setSlicedPosts,
        decrementN,
        setBigCards,
        setN,
        setBtnText,
        showMorePosts,
        resetPosts,
        setSelectedPost,
        setSelectedUser,
        changePostColor,
        addPost,
        updatePost,
        deletePost,
        addUser,
        updateUser,
        deleteUser,
        bigCards,
} = articleSlice.actions;

export default articleSlice.reducer;