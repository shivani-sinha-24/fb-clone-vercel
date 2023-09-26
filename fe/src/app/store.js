import { configureStore } from "@reduxjs/toolkit";

import loginUserDataReducer from '../reducers/loginUserDataSlice';
import allUsersPostReducer from "../reducers/allUsersPostSlice";
import themeReducer from "../reducers/themeSlice";
import profileUserReducer from "../reducers/profileUserSlice";
import friendRequestReducer from "../reducers/friendRequestSlice";


const store = configureStore({
    reducer:{
        loginUserDataReducer,
        allUsersPostReducer,
        themeReducer,
        profileUserReducer,
        friendRequestReducer,
    }
})

export default store