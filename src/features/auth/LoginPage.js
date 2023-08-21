import React from "react";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { validateLogin } from "./authThunks";
import {
  status,
  isAuthorised,
  setJWT,
  setUserData,
  setStatus,
} from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { errorCode as errorCodeState } from "./authSlice";

export const LoginPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const isAuthorisedState = useSelector(isAuthorised);
  const [checked, setChecked] = useState(true);
  const statusState = useSelector(status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStatus("idle"));
    document.title = "Log In";
  }, [dispatch]);

  //401 unauthorized access - email and password don't match
  //404 resource not found - email doesn't exist
  //500 internal server error - oops! something went wrong
  const errorCode = useSelector(errorCodeState);

  if (isAuthorisedState) return <Navigate to="/dashboard" />;

  const togglePasswordShown = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="grid grid-cols-2 justify-center justify-items-center bg-white my-[4%]">
      <div className="self-center">
        <img src="./svg/Group.svg" alt="" />
      </div>

      <div className="my-7 pl-14 pt-16 pb-20 pr-32 self-center rounded-[65px] border-2 border-[#1A3B58] border-opacity-[24%]">
        <div className="flex flex-row font-poppins">
          <Link
            className="mr-[23px] font-medium text-blue text-[26px] content-center"
            to="/login"
          >
            Log In
            <div className="ml-[2px] w-[17px] border-t-[3px] border-blue"></div>
          </Link>
          <Link
            className="font-normal text-lightgray text-[26px] text-opacity-[33%] content-center hover:text-blue hover:text-opacity-80"
            to="/signup"
          >
            Sign up
          </Link>
        </div>

        <div className="mt-6 ml-[67px] w-[314px]">
          <div className="border-t-2 rounded-[65px] border-[#4091DF1F] border-opacity-[24%]"></div>

          <div className="mt-6 font-poppins">
            <div className="font-medium text-blue text-[21px]">To Continue</div>
            <div className="mt-1 font-light text-[#999999] text-[10px]">
              We need your Name & Email
            </div>
          </div>

          <input
            className={`mt-8 rounded-lg w-[314px] pl-[19px] py-2 font-poppins font-light 
                    placeholder:text-[#B7C0C9] text-blue placeholder:text-[14px] focus:outline-0 ${
                      errorCode === "401" ||
                      errorCode === "404" ||
                      errorCode === "500"
                        ? "ring-[#F65B2A] ring-1 rinf-offset-0"
                        : "border-[#CBDBEA] border-[1px]"
                    }`}
            placeholder="Email"
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
          />

          <div
            className={`mt-8 rounded-lg w-[314px] relative ${
              errorCode === "401" || errorCode === "500"
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
                className="absolute w-[17px] h-[30px] right-4 top-1"
              />
            </button>
          </div>

          {statusState === "error" ? (
            errorCode === "401" ? (
              <div className="mt-4 -mb-4 flex justify-center font-roboto font-normal text-[#F65B2A] text-[11px]">
                <img src="./svg/error.svg" alt="" className="inline" />
                <div className="inline pl-1">
                  Your Email & Password do not match
                </div>
              </div>
            ) : errorCode === "404" ? (
              <div className="mt-4 -mb-4 flex justify-center font-roboto font-normal text-[#F65B2A] text-[11px]">
                <img src="./svg/error.svg" alt="" className="inline" />
                <div className="inline pl-1">Please Enter a valid Email</div>
              </div>
            ) : errorCode === "500" ? (
              <div className="mt-4 -mb-4 flex justify-center font-roboto font-normal text-[#F65B2A] text-[11px]">
                <img src="./svg/error.svg" alt="" className="inline" />
                <div className="inline pl-1">Oops! Something went wrong</div>
              </div>
            ) : (
              <div></div>
            )
          ) : (
            <div></div>
          )}

          <button
            className="mt-8 bg-[#329C89] rounded-lg w-[314px] font-poppins font-bold text-[17px] text-[#FFFFFF] text-center py-2 disabled:bg-opacity-60"
            disabled={
              !emailValue || !passwordValue || statusState === "loading"
            }
            onClick={() => {
              dispatch(
                validateLogin({
                  emailValue,
                  passwordValue,
                  setJWT,
                  setUserData,
                })
              );
            }}
          >
            Log In
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
