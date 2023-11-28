import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import booksReducer from "./books";
import commentsReducer from "./comments";

const rootReducer = combineReducers({
    users: usersReducer,
    books: booksReducer,
    comments: commentsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
