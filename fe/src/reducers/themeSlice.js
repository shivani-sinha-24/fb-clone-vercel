import { createSlice } from "@reduxjs/toolkit";

const initialState = false

export const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        setDarkTheme:(state,action)=> action.payload
    }
}) 

export const {setDarkTheme} = themeSlice.actions

export default themeSlice.reducer