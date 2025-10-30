import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "../slices/ArticleSlice";

export const store = configureStore({
    reducer: {
        article: articleReducer,
    },
});
