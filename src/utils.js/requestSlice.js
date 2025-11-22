import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name : "request",
    initialState : [],
    reducers:{
        addRequest : (state,action)=>{
            return action.payload
        },
        removeRequest : (state, action)=>{
            const newAray = state.filter(r=> r._id !== action.payload)
            return newAray
        }
    }
})
export const{addRequest, removeRequest} = requestSlice.actions
export default requestSlice.reducer