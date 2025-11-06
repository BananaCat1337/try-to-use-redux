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
                postColors: {},
        },
        reducers: {
                setPosts: (state, action) => {
                        const { payload } = action;
                        state.posts = payload;
                        state.slicedPosts = payload.slice(0, state.n);
                        state.showButton = payload.length > state.n;
                },
                setUsers: (state, action) => {
                        const { payload } = action;
                        state.users = payload;
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

                        state.slicedPosts = state.posts.slice(0, newN);

                        if (newN >= state.posts.length) {
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
        changePostColor,
        bigCards,
} = articleSlice.actions;

export default articleSlice.reducer;