import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { errorCode as errorCodeState } from "./authSlice";
import { validateSignup } from "./authThunks";
import {
  status,
  isAuthorised,
  setJWT,
  setUserData,
  setStatus,
} from "./authSlice";

export const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [checked, setChecked] = useState(true);
  const isAuthorisedState = useSelector(isAuthorised);
  const statusState = useSelector(status);
  const dispatch = useDispatch();
  //409 conflict - email already exists
  //500 internal server error - oops! something went wrong
  const errorCode = useSelector(errorCodeState);

  useEffect(() => {
    dispatch(setStatus("idle"));
    document.title = "Sign Up";
  }, [dispatch]);

  if (isAuthorisedState) return <Navigate to="/dashboard" />;

  const togglePasswordShown = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="grid grid-cols-2 justify-center justify-items-center bg-white my-[4%]">
      <div className="self-center">
        <img src="./svg/Group.svg" alt="" />
      </div>

      <div className="my-7 pl-14 pt-16 pb-20 pr-32 self-center rounded-[60px] border-2 border-gray border-opacity-[24%]">
        <div className="flex flex-row font-poppins">
          <Link
            className="mr-[23px] font-normal text-[#1A3B5854] text-opacity-[33%] text-[26px] content-center hover:text-blue hover:text-opacity-80"
            to="/login"
          >
            Log In
          </Link>
          <Link
            className="text-blue font-medium text-[26px] content-center"
            to="/signup"
          >
            Sign up
            <div className="ml-[2px] w-[17px] border-t-[3px] border-blue"></div>
          </Link>
        </div>

        <div className="mt-6 ml-[67px] w-[314px]">
          <div className="border-t-2 rounded-[65px] border-[#4091DF1F] border-opacity-[24%]"></div>

          <input
            className={`mt-8 rounded-lg w-[314px] pl-[19px] py-2 font-poppins font-light 
                    placeholder:text-[#B7C0C9] text-blue placeholder:text-[14px] focus:outline-0 ${
                      errorCode === "500"
                        ? "ring-[#F65B2A] ring-1 rinf-offset-0"
                        : "border-[#CBDBEA] border-[1px]"
                    }`}
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            type="text"
          />

          <input
            className={`mt-8 rounded-lg w-[314px] pl-[19px] py-2 font-poppins font-light 
                    placeholder:text-[#B7C0C9] text-blue placeholder:text-[14px] focus:outline-0 ${
                      errorCode === "409" || errorCode === "500"
                        ? "ring-[#F65B2A] ring-1 rinf-offset-0"
                        : "border-[#CBDBEA] border-[1px]"
                    }`}
            placeholder="Email"
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
            type="email"
          />

          <div
            className={`mt-8 rounded-lg w-[314px] relative ${
              errorCode === "500"
                ? "ring-[#F65B2A] ring-1 rinf-offset-0"
                : "border-[#CBDBEA] border-[1px]"
            }`}
          >
            <input
              className="w-[85%] pl-[19px] my-2 font-poppins font-light placeholder:text-[#B7C0C9] text-blue text-[14px] focus:outline-0"
              placeholder="Password"
              value={passwordValue}
              onChange={(e) => {
                setPasswordValue(e.target.value);
              }}
              type={passwordShown ? "text" : "password"}
            />
            <button onClick={togglePasswordShown}>
              <img
                src={
                  passwordShown
                    ? "./svg/bi_eye-fill.svg"
                    : "./svg/EyeClosed.svg"
                }
                alt=""
                className="absolute w-[17px] h-[30px] right-4 top-1 "
              />
            </button>
          </div>

          {errorCode === "409" ? (
            <div className="mt-4 -mb-4 flex justify-center font-roboto font-normal text-[#F65B2A] text-[11px]">
              <img src="./svg/error.svg" alt="" className="inline" />
              <div className="inline pl-1">
                An account with this email id already exists
              </div>
            </div>
          ) : errorCode === "500" ? (
            <div className="mt-4 -mb-4 flex justify-center font-roboto font-normal text-[#F65B2A] text-[11px]">
              <img src="./svg/error.svg" alt="" className="inline" />
              <div className="inline pl-1">Oops! Something went wrong</div>
            </div>
          ) : (
            <div></div>
          )}

          <button
            className="mt-8 bg-[#329C89] rounded-lg w-[314px] font-poppins font-bold text-[17px] text-[#FFFFFF] text-center py-2 disabled:bg-opacity-60"
            disabled={
              !emailValue ||
              !passwordValue ||
              !fullName ||
              statusState === "loading"
            }
            onClick={() => {
              dispatch(
                validateSignup({
                  name: fullName,
                  email: emailValue,
                  password: passwordValue,
                  setJWT,
                  setUserData,
                })
              );
            }}
          >
            Sign Up
          </button>
          <div>
            <input
              type="checkbox"
              className="mt-10 accent-[#329C89] bg-gray w-[11px] h-[11px] border-[#329C89]"
              checked={checked}
              onChange={(e) => setChecked(e.target.value)}
            />
            <div className="inline mt-4 ml-2 font-poppins font-light text-[#1A3B589C] text-opacity-[61%] text-[10px]">
              Remember Me
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
