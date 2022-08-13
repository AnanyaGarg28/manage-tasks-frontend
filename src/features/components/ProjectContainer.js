import React from 'react';
import {TbCloudUpload} from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { addProject } from '../projects/projectsThunks';
import { useState } from 'react';
export const emptyProjectChecker = () => {
    return (
        <div>Can't add an empty project.</div>
    );
};

export const ProjectContainer = ({type, setShowProjectContainer}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div className='shadow-[0_0_28px_0_rgba(72, 174, 174, 0.07)] border-[1px] border-[#DBDBDB] rounded-[7px] bg-[#FFFFFF] box-border
            px-[18.5px] py-[21.5px] font-poppins mt-6 w-full'>
            <input className='font-poppins placeholder:font-medium text-[15px] placeholder:text-[#A4ABB3] mt-4 focus:outline-0 text-[#212121]'
             placeholder='Give your task a title '
             value={title}
             onChange={(e) => {setTitle(e.target.value)}}/>
            <input className='font-poppins font-normal text-xs placeholder:text-[#A4ABB3] mt-2 focus:outline-0 text-[#6B6B6B] w-full mb-4'
             placeholder='Description...' 
             value={description}
             onChange={(e) => {setDescription(e.target.value)}}/>
            <div className='flex mt-4 justify-between'>
                <img src="./svg/NewAuthor.svg" alt="" className='h-6 w-6 border-1 border-[#E1E1E1] '/>
                <button className=' text-[#329C89] text-lg' onClick={() => {
                    if(title === "" && description === "")  {<emptyProjectChecker/>}
                    dispatch(addProject({title, description, status: type}));
                    setShowProjectContainer("");
                    setTitle("");
                    setDescription("");
                }}>
                    <TbCloudUpload className=' hover:opacity-70'/>
                </button>
            </div>
        </div>
    )
}