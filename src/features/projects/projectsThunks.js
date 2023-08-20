import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadProjects = createAsyncThunk(
    'projects/loadProjects',
    async () => {
        try {
            const response = await fetch('https://task-management-backend-i505.onrender.com/api/projects')
            .then(res=>res.json());
            return response;
        } catch(error) {
            return "error";
        };
    }
);

export const addProject = createAsyncThunk(
    'projects/addProject',
    async ({ title, description, status }, { getState }) => {
        try {
            const { auth } = getState();
            const task = { 
                title, 
                description, 
                author:auth.userDetails._id, 
                status,
            };
            const reqBody = JSON.stringify(task);
            const response = await fetch('https://task-management-backend-i505.onrender.com/api/add-project', {
                method: 'post',
                headers: {"Content-Type": 'application/json'}, 
                body: reqBody,
            }).then(res => res.json());

            const { insertedId } = response;
            task._id = insertedId;
            task.authorInfo = { 
                name: auth.userDetails.userInfo.name,
                email: auth.userDetails.email,
                profilePic: auth.userDetails.userInfo.profileImage,
            }
            return task;

        } catch(error) {
            return "error";
        }
    }
);

export const deleteProject = createAsyncThunk(
    'projects/deleteProject',
    async ({ _id }, { getState }) => {
        try {
            await fetch(`https://task-management-backend-i505.onrender.com/api/delete-project/${_id}`, {
                method: 'post',
            }).then(res => res.json());
            return _id;

        } catch(error) {
            return "error";
        }
    }
);
