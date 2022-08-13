//make auth thunks
import { createSlice } from '@reduxjs/toolkit';
import { validateLogin, validateSignup } from './authThunks';

const initialState = {
    isAuthorised: false,
    userDetails: null,
    JWT: null,
    status: 'idle',
    errorCode: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setJWT: (state, action) => {
            localStorage.setItem('token', action.payload);
            state.JWT = action.payload;
        },
        setUserData: (state) => {
            const { JWT } = state;
            if(JWT) {
                const encodedUserData = JWT.split('.')[1];
                state.userDetails = JSON.parse(atob(encodedUserData));
                state.isAuthorised = true;
            }
            state.status = 'fulfilled';
        },
        getJWTFromStorage: (state) => {
            const token = localStorage.getItem('token');
            state.JWT = token;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        logOut: (state) => {
            localStorage.removeItem('token');
            state.JWT = null;
            state.userDetails = null;
            state.isAuthorised = false;
        }
    },
    extraReducers: (builder) => {
        builder
         .addCase(validateLogin.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(validateLogin.fulfilled, (state, action) => {
            if(action.payload!=="success")  {
                state.status = "error";
                state.errorCode = action.payload;
            }
            else state.status = action.payload;
         })
         .addCase(validateSignup.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(validateSignup.fulfilled, (state, action) => {
            if(action.payload!=="success")  {
                state.status = "error";
                state.errorCode = action.payload;
            }
            else state.status = action.payload;
        });
    },
});
export const status = state=>state.auth.status;
export const userDetails = state=>state.auth.userDetails;
export const isAuthorised = state=>state.auth.isAuthorised;
export const errorCode = state => state.auth.errorCode;
export const { setJWT, setUserData, getJWTFromStorage, setStatus, logOut } = authSlice.actions;

export default authSlice.reducer;
