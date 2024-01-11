/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { CustomButton, Loading, TextInput } from "../../components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BgImage } from "../../assets";
import { BsShare } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { ImBubble, ImConnection } from "react-icons/im";
import { apiRequest } from "../../utils";
import { UserLogin } from "../../reduxSlice/userSlice";

/**
 * Component for user login page.
 * Allows users to log in, capturing and displaying form errors.
 * Uses React Hook Form for form management.
 */
const Login = () => {
  //   set a state to manage form error messages
  const [errMsg, setErrMsg] = useState("");
  // track submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);
  // dispatch action from state when fro user login
  const dispatch = useDispatch();
  // handle form error state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  /**
   * Handles the submission of user login data.
   * Exposes the "/auth/login" endpoint to a user on attempted login.
   * Updates state and dispatches actions based on the server response.
   * params -> {Object} data - User login data.
   */
  const submitLoginData = async (data) => {
    // expose the auth/login endpoint to a user on attempted login
    setIsSubmitting(true);
    try {
      const res = await apiRequest({
        url: "/auth/login",
        data: data,
        method: "POST",
      });
      // if response from server is failed - update setErrMsg and dispaly the message
      if (res.status === "failed") {
        setErrMsg(res);
      } else {
        // otherwise err msg is empty
        setErrMsg("");
        // set the state with token and user from the database
        const newData = { token: res?.token, ...res?.user };
        dispatch(UserLogin(newData));
        window.location.replace("/");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //Main container for the login page
    <div className=" w-full h-[100vh] flex items-center justify-center p-6 bg-primary mx-auto">
      <div className="max-w-6xl flex w-full bg-primary rounded-xl md:2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 overflow-hidden shadow-xl ">
        {/* left area of the login page */}
        <div className="flex flex-col justify-center w-full h-full lg:w-1/2 p-10 2xl:px-20 ">
          {/* Logo and title section */}
          <div className="w-full flex gap-2 items-center mb-6">
            <div className="p-2 bg-[#065ad8] rounded text-white">
              <HiMiniViewfinderCircle />
            </div>
            <span className="text-2xl text-[#065ad8] font-semibold">
              Memories
            </span>
          </div>
          {/* Login direction text */}
          <p className="text-ascent-1 text-base font-semibold">
            Login to your account
          </p>
          <span className="text-ascent-2 text-sm mt-2">Welcome back</span>

          {/* Login form */}
          {/* used react-hook-form handleSubmit to prevent default behaviour */}
          <form
            className="py-8 flex flex-col gap-5"
            onSubmit={handleSubmit(submitLoginData)}
          >
            {/* custom Text input is here to achieve re-useability and easy styling of component and similar content */}
            {/* email input */}
            <TextInput
              name="email"
              placeholder="email@example.com"
              type="email"
              label="Email Address"
              register={register("email", {
                required: "Email address is required",
              })}
              styles="rounded-lg w-full"
              labelStyles="ml-2"
              error={errors.email ? errors.email?.message : ""}
            />
            {/* passowrd field */}

            <TextInput
              name="password"
              placeholder="Password"
              type="password"
              label="Password"
              register={register("password", {
                required: "Password is required",
              })}
              styles="rounded-lg w-full"
              labelStyles="ml-2"
              error={errors.password ? errors.password?.message : ""}
            />

            {/* forget password */}
            <Link
              to="/reset-password"
              className="text-sm text-blue font-semibold text-right"
            >
              Forgot password ?
            </Link>
            {/* display error message if any */}
            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status == "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            {/* display loading state or login button */}
            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                title="Login"
              />
            )}
          </form>
          {/* Link to create an account for new user */}
          <p className="text-ascent-2 text-sm text-center">
            Don't have an account?
            <Link
              to="/register"
              className="text-[#065ad8] font-semibold ml-2 cursor-pointer"
            >
              Create Account
            </Link>
          </p>
        </div>
        {/* --------------- right area of the login page--------------------- */}

        <div className="hidden w-1/2 h-auto lg:flex flex-col items-center justify-center bg-blue bg-opacity-90">
          {/* image and icons div area/section */}
          <div className="relative w-full flex items-center justify-center">
            {/* image elememt */}
            <img
              src={BgImage}
              alt="Bg Image"
              className="w-56 2xl:w-80 h-56 2xl:h-80 rounded-full object-cover bg-opacity-45"
            />
            {/* share  icon */}
            <div className="absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full">
              <BsShare size={14} />
              <span className="text-xs font-medium">Share</span>
            </div>

            {/* connect icon */}
            <div className="absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full">
              <ImConnection />
              <span className="text-xs font-medium">Connect</span>
            </div>

            {/* interact icon*/}
            <div className="absolute flex items-center gap-1 bg-white bottom-2 left-10 py-2 px-5 rounded-full">
              <AiOutlineMessage />
              <span className="text-xs font-medium">Interact</span>
            </div>
          </div>
          {/* -----------Overlay text on the picture area-------------- */}
          <div className="mt-16 text-center">
            <p className="text-white text-base">
              Connect with friends and loved ones & share memories
            </p>
            <span className="text-sm text-white/60">
              capture your thoughts and favorite moments and share with the
              world
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
