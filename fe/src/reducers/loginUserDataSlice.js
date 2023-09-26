import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

export const loginUserDataSlice =createSlice({
    name:'loginUserData',
    initialState,
    reducers:{
        addLoginUserData:{
            reducer(state,action){
                const newState = {
                    _id: action.payload._id,
                    fName: action.payload.fName,
                    lName: action.payload.lName,
                    email: action.payload.email,
                    date: action.payload.date,
                    month: action.payload.month,
                    year: action.payload.year,
                    gender: action.payload.gender,
                    posts: action.payload.posts,
                    friendRequests: action.payload.friendRequests,
                    details: action.payload.details,
                    friends: action.payload.friends,
                    profilePhoto: action.payload.profilePhoto,
                    coverPhoto: action.payload.coverPhoto,
                    hobbies: action.payload.hobbies,
                    messages: action.payload.messages,
                    sentFriendRequest: action.payload.sentFriendRequest
                }
                return newState;
            },
            prepare(_id,fName,lName,email,date,month,year,posts,gender,friendRequests,details,friends,profilePhoto,coverPhoto,hobbies,messages,sentFriendRequest){
                return{
                    payload:{
                        _id,
                        fName,
                        lName,
                        email,
                        date,
                        month,
                        year,
                        posts,
                        gender,
                        friendRequests,
                        details,
                        friends,
                        profilePhoto,
                        coverPhoto,
                        hobbies,
                        messages,
                        sentFriendRequest
                    }
                }
            }
        },
        resetLoginUserData:(state,action)=>{
            const newState = {}
            return newState
        }
    }
}) 

export const {addLoginUserData,resetLoginUserData} = loginUserDataSlice.actions

export default loginUserDataSlice.reducer