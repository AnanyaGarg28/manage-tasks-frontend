import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { setStatus, getJWTFromStorage, setUserData, status as statusState, isAuthorised as isAuthorisedState } from './authSlice';

export const PrivateRoute = () => {
    //used to call reducers from slice/thunks
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setStatus('idle'));
        dispatch(getJWTFromStorage());
        dispatch(setUserData());
    }, []);

    //const status = useSelector(statusState);
    const isAuthorised = useSelector(isAuthorisedState);

    //if(status === "idle")   return <></>;
    return isAuthorised ? <Outlet /> : <Navigate to="/login"/>
}