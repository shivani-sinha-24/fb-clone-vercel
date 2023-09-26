import { createSlice } from "@reduxjs/toolkit";

const initialState = false

export const friendRequestSlice = createSlice({
    name:'friendRequest',
    initialState,
    reducers:{
        requestSent:(state,action)=> action.payload,

    }
}) 

export const {requestSent} = friendRequestSlice.actions

export default friendRequestSlice.reducer