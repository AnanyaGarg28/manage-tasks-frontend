import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projects, deleteTask, } from '../features/projects/projectsSlice';
import { loadProjects, deleteProject } from '../features/projects/projectsThunks';
import { FaTrash } from "react-icons/fa";
import { ProjectContainer } from '../features/components/ProjectContainer';
import { userDetails, logOut } from '../features/auth/authSlice';
import { IoIosClose } from 'react-icons/io';

export const Dashboard = () => {

    const dispatch = useDispatch();
    const projectsList = useSelector(projects);
    const user = useSelector(userDetails);
    const todoProjects = projectsList.filter(project => project.status==="todo");
    const completedProjects = projectsList.filter(project => project.status==="completed");
    const inProgressProjects = projectsList.filter(project => project.status==="in progress");
    const [showProjectContainer, setShowProjectContainer] = useState("");
    const [expandProject, setExpandProject] = useState(null);

    useEffect(() => {
        dispatch(loadProjects());
    }, []);

    return (
        <div className='flex flex-rows-2 bg-[#FEFEFE] divide-x-[1.5px] divide-[#F0F0F0]'>
            <div className='mx-20 mt-14 w-[14%]'>
                <div className='font-poppins font-medium text-[#161616] text-[20px] tracking-wide'>.taskez</div>
                <div className='font-poppins font-normal text-[17px] text-[#9A9A9A]'>
                <button className='mt-20 flex tracking-widest'>
                    <img src="./svg/Overview.svg" alt="" className='mr-7 inline-block self-center '/> Overview
                </button>
                <button className='mt-8 flex tracking-widest'>
                    <img src="./svg/Stats.svg" alt="" className='mr-7 inline-block self-center '/> Stats
                </button>
                <button className='text-[#212121] mt-8 flex font-medium'>
                    <img src="./svg/Projects.svg" alt="" className='mr-7 inline-block self-center'/> Projects
                </button>
                <button className='mt-8 flex tracking-widest'>
                    <img src="./svg/Chat.svg" alt="" className='mr-7 inline-block self-center'/> Chat
                </button>
                <button className='mt-8 flex tracking-widest'>
                    <img src="./svg/Calendar.svg" alt="" className='mr-7 inline-block self-center'/> Calendar
                </button>
                <button className='mt-40 flex tracking-widest'>
                    <img src="./svg/Settings.svg" alt="" className='mr-7 inline-block self-center'/> Setting
                </button>
                <button className='mt-10 flex tracking-widest hover:text-[#212121]' onClick={() => {dispatch(logOut())}}>
                    <img src="./svg/Logout.svg" alt="" className='mr-7 inline-block self-center'/> Log Out
                </button>
                </div>
            </div>
            <div className='grow px-16 pt-14 '>
                <div className='flex flex-row '>
                    <div className='flex self-center w-1/3 font-poppins font-normal text-[17px] text-[#9A9A9A] tracking-widest'>
                        <img src="./svg/Search.svg" alt="" className='mr-4' /> 
                        <input className='focus:outline-0' placeholder='Search'/>
                    </div>
                    <div className='flex justify-center w-1/3'>
                        <img src="./svg/People.svg" alt="" />
                    </div>
                    <div className='flex justify-end place-self-center w-1/3 font-poppins font-normal text-[17px] text-[#3A3A3A] tracking-widest'>
                        <div className='self-center'> Hi {user.userInfo.name}
                        </div> 
                        <img src={user.userInfo.profileImage} alt="" className='ml-4 inline-block self-center h-11 w-11'/>
                    </div>
                </div>
                <div className="flex flex-row mt-16">
                    <div className='font-poppins font-medium text-[24px] text-[#212121] grow'>Projects</div>
                    <button className='font-poppins font-normal text-[17px] text-[#3A3A3A] tracking-widest'>
                        <img src="./svg/Filter.svg" alt="" className='inline mr-4'/>
                        <div className='self-center inline'>Filter</div>
                    </button>
                </div>
                <div className='flex flex-row mt-8 font-poppins font-medium relative max-h-max'>
                    {
                        expandProject && 
                        <div className='absolute bg-white right-0 top-0 h-full w-[45%] pt-5 px-8 font-poppins shadow-lg'>
                            <div className='flex'>
                                <div className='font-medium text-[17px] text-[#212121] self-center grow'>{expandProject.title}</div>
                                <IoIosClose className='self-center h-8 w-8 hover:opacity-70 text-[#329C89]' onClick={() => {setExpandProject(null)}}/>
                            </div>
                            <div className='mt-4 border-t-[3px] border-[#329C89] w-9'></div>
                            <div className='mt-[60px] flex text-[12px]'>
                                <div className='font-normal text-[#6B6B6B] mr-9 self-center'>Created By</div>
                                <div className='self-center flex'>
                                    <img src={expandProject.authorInfo.profilePic} alt="" className='h-[25.26px] w-[25.26px] mr-3 self-center inline'/>
                                    <div className='text-[#2E2E2E] font-normal self-center'>{expandProject.authorInfo.name}</div>
                                </div>
                            </div>
                            <div className='mt-[40px] flex font-normal text-[12px]'>
                                <div className='text-[#6B6B6B] self-center mr-9'>Description</div>
                                <div className=' text-[#2E2E2E] self-center'>{expandProject.description}</div>
                            </div>
                        </div>
                    }
                    <div className='bg-[#F5F9F9] w-[350px] mr-4 p-4 rounded-[15px]'>
                        <div className="flex">
                            <div className='text-[#212121] text-[16px] grow'>To do</div>
                            <div className='text-center text-[#329C89] bg-[#ECF3F3] rounded-[7px] w-6'>{todoProjects.length}</div>
                        </div>
                        <button className='bg-[#ECF3F3] rounded-[7px] mt-5 w-full h-10' onClick={() => {
                            setShowProjectContainer(showProjectContainer ? "" : "todo");}}>
                            <img src="./svg/Plus.svg" alt="" className='w-4 h-4 mx-auto'/>
                        </button>
                        {showProjectContainer==="todo" && (<ProjectContainer type="todo" setShowProjectContainer={setShowProjectContainer}/>)}
                        {todoProjects.map(project => (
                            <div className='bg-white px-[18.5px] py-[21.5px] font-poppins mt-6 rounded-lg w-full draggable' onClick={() => {setExpandProject(expandProject ? null : project)}}>
                                <div className="flex">
                                 <div className="font-medium text-sm text-[#212121] grow">{project.title}</div>
                                 <button onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(deleteTask(project._id));
                                    dispatch(deleteProject({_id: project._id}));
                                 }}>
                                    <FaTrash className="text-right text-[#329C89] text-sm hover:text-opacity-70"/>
                                 </button>
                                </div>
                                <div className="font-normal text-xs text-[#6B6B6B] mt-2">{project.description}</div>
                                <div className="flex mt-6">
                                    <img src={project.authorInfo.profilePic} className="h-7 w-7" alt=""/>
                                </div> 
                            </div>
                        ))}
                    </div>
                    <div className='bg-[#F5F9F9] w-[350px] mx-4 p-4 rounded-[15px]'>
                        <div className="flex">
                            <div className=' text-[#212121] text-[16px] grow'>In Progress</div>
                            <div className='text-center text-[#329C89] bg-[#ECF3F3] rounded-[7px] w-6'>{inProgressProjects.length}</div>
                        </div>
                        <button className='bg-[#ECF3F3] rounded-[7px] mt-5 w-full h-10' onClick={() => {
                            setShowProjectContainer(showProjectContainer ? "" : "in progress");}}>
                            <img src="./svg/Plus.svg" alt="" className='w-4 h-4 mx-auto'/>
                        </button>
                        {showProjectContainer==="in progress" && (<ProjectContainer type="in progress" setShowProjectContainer={setShowProjectContainer}/>)}
                        {inProgressProjects.map(project => (
                            <div className='bg-white px-[18.5px] py-[21.5px] font-poppins mt-6 rounded-lg w-full' onClick={() => {setExpandProject(expandProject ? null : project)}}>
                                <div className="flex">
                                 <div className="font-medium text-sm text-[#212121] grow">{project.title}</div>
                                 <button onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(deleteTask(project._id));
                                    dispatch(deleteProject({_id: project._id}));
                                 }}>
                                    <FaTrash className="text-right text-[#329C89] text-sm hover:text-opacity-70"/>
                                 </button>
                                </div>
                                <div className="font-normal text-xs text-[#6B6B6B] mt-4">{project.description}</div>
                                <div className="flex mt-6">
                                    <img src={project.authorInfo.profilePic} className="h-7 w-7" alt=""/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='bg-[#F5F9F9] w-[350px] mx-4 p-4 rounded-[15px]'>
                        <div className="flex">
                            <div className='text-[#212121] text-[16px] grow'>Completed</div>
                            <div className='text-center text-[#329C89] bg-[#ECF3F3] rounded-[7px] w-6'>{completedProjects.length}</div>
                        </div>
                        <button className='bg-[#ECF3F3] rounded-[7px] mt-5 w-full h-10' onClick={() => {
                            setShowProjectContainer(showProjectContainer ? "" : "completed");}}>
                            <img src="./svg/Plus.svg" alt="" className='w-4 h-4 mx-auto'/>
                        </button>
                        {showProjectContainer==="completed" && (<ProjectContainer type="completed" setShowProjectContainer={setShowProjectContainer}/>)}
                        {completedProjects.map(project => (
                            <div className='bg-white px-[18.5px] py-[21.5px] font-poppins mt-6 rounded-lg w-full' onClick={() => {setExpandProject(expandProject ? null : project)}}>
                                <div className="flex">
                                 <div className="font-medium text-sm text-[#212121] grow">{project.title}</div>
                                 <button onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(deleteTask(project._id));
                                    dispatch(deleteProject({_id: project._id}));
                                 }}>
                                    <FaTrash className="text-right text-[#329C89] text-sm hover:text-opacity-70"/>
                                 </button>
                                </div>
                                <div className="font-normal text-xs text-[#6B6B6B] mt-4">{project.description}</div>
                                <div className="flex mt-6">
                                    <img src={project.authorInfo.profilePic} className="h-7 w-7" alt=""/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div></div>
        </div>
    );
}
