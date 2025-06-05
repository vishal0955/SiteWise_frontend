

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../utils/config";

export const  loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/login`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
            });
            if (response.status !== 200) {
            return rejectWithValue(response.data.message || 'Login failed');
            }
            console.log("login response ", response)

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
            // localStorage.setItem('user', JSON.stringify(response.data.data.user?.id));
            localStorage.setItem('role', JSON.stringify(response.data.data.user?.role));
            localStorage.setItem('permissions', JSON.stringify(response.data.data.user?.permissions));
            
           
           
            return response.data;  
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    })



    const initialState= {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('role') || null,
        permissions: JSON.parse(localStorage.getItem('permissions')) || null,
        loading: false,
        error: null,
    }


    const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
            logout: (state) => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('permissions');
                state.user = null;
                state.token = null;
                state.role = null;
                state.permissions = null;
            },
            clearMessages: (state) => {
                state.error = null;
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(loginUser.pending, (state) => {
                    state.loading = true;
                })
                .addCase(loginUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                    state.role = action.payload.role; 
                    state.permissions = action.payload.permissions; response
                    state.error = null;
                })
                .addCase(loginUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                });
        },



    })


    export const { logout, clearMessages } = authSlice.actions;
    export default authSlice.reducer; 

