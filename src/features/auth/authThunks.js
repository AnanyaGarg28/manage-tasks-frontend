import { createAsyncThunk } from '@reduxjs/toolkit';

export const validateLogin = createAsyncThunk(
    'auth/validateLogin',
    async ({ emailValue :email, passwordValue:password, setJWT, setUserData }, { dispatch }) => {
        try {
            const reqObject={
                email,
                password,
            };
            const body=JSON.stringify(reqObject);
            const response = await fetch('https://task-management-backend-i505.onrender.com/api/login', {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body,
            }).then(res => {
                if(res.status!==200)    throw `${res.status}`;
                return res;
            }).then(res=>res.json());
            const { token } = response;
            dispatch(setJWT(token));
            dispatch(setUserData(token));
            return 'success';
        } catch(error) {
            return error;
        }
    }
);

export const validateSignup = createAsyncThunk(
    'auth/validateSignup',
    async ({ name, email, password, setJWT, setUserData }, {dispatch}) => {
        try {
            const reqObject={
                name,
                email,
                password,
            };
            const body=JSON.stringify(reqObject);
            const response = await fetch('https://task-management-backend-i505.onrender.com/api/signup',{
                method: "post",
                headers: { "Content-Type": "application/json" },
                body,
            }).then(res => {
                if(res.status!==200)    throw `${res.status}`;
                return res;
            }).then(res=>res.json());
            const { token } = response;
            dispatch(setJWT(token));
            dispatch(setUserData(token));
            return "success"
        } catch (error) {
            return error;
        }
    }
);