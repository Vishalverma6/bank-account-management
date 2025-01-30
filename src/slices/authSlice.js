import { createSlice } from "@reduxjs/toolkit";


const initialState= {
    bankDetail:null,
    loading:null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setBankDetail(state,action){
            state.bankDetail= action.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        setToken(state,value){
            state.token=value.payload;
        },
    }
});

export const {setToken,setLoading,setBankDetail} = authSlice.actions;
export default authSlice.reducer;