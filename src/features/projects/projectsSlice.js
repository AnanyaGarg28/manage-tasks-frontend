import { createSlice } from '@reduxjs/toolkit';
import { addProject, loadProjects } from './projectsThunks';
const initialState = {
    projects: [],
    status: 'idle',
};

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: { 
        deleteTask: (state, action) => {
            state.projects = state.projects.filter(task => task._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
         .addCase(loadProjects.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(loadProjects.fulfilled, (state, action) => {
            if(action.payload === "error")  state.status = "error";
            else {
                state.projects = action.payload;
                state.status = "loaded";
            }
         })
         .addCase(addProject.pending, (state) => {
            state.status = "adding";
         })
         .addCase(addProject.fulfilled, (state, action) => {
            state.projects = state.projects.concat(action.payload);
            state.status = "fulfilled";
         })
    },
})

export const { deleteTask } = projectsSlice.actions;
export const projects = state => state.projects.projects;
export default projectsSlice.reducer;
