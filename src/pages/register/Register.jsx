/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import { HiMiniViewfinderCircle } from "react-icons/hi2";
// Importing custom components and utilities
import { CustomButton, Loading, TextInput } from "../../components";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

// Utility function for making API requests
import { apiRequest, validatePassword, validateEmail } from "../../utils";

// component for the Register page
const Register = () => {
  // State to store error message and display where required
  const [errMsg, setErrMsg] = useState("");
  // State to track submission statusng
  const [isSubmitting, setIsSubmitting] = useState(false);
  // dispatch action from state when fro user login
  const dispatch = useDispatch();
  // Navigation hook for redirecting
  const navigate = useNavigate();
  //Form handling using react-hook-form
  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // Function to submit registration data to the server
  const submitRegisterData = async (data) => {
    setIsSubmitting(true);
    // Make API request for user registration
    try {
      const res = await apiRequest({
        url: "/auth/register",
        data: data,
        method: "POST",
      });
      // Check the response status and update error messa
      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg(res);

        // automatically redirect the user to the login page after 5secs
        setTimeout(() => {
          // window.location.replace("/login");
          navigate("/login");
        }, 5000);
      }

      // Reset submission status
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-primary mx-auto w-full h-[100vh] flex items-center justify-center p-6 ">
      {/* main content container */}
      <div className="max-w-6xl flex w-full bg-primary rounded-xl md:2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 overflow-hidden shadow-lg">
        {/* left area with registrattion form */}
        <div className="flex flex-col justify-center w-full h-full lg:w-1/2 p-10 2xl:px-20 ">
          {/* Logo and app name */}
          <div className="w-full flex gap-2 items-center mb-6">
            <div className="p-2 bg-[#065ad8] rounded text-white">
              <HiMiniViewfinderCircle />
            </div>
            <span className="text-2xl text-[#065ad8] font-semibold">
              Memories
            </span>
          </div>
          {/* Registration form header */}
          <p className="text-ascent-1 text-base font-semibold">
            Create your account
          </p>

          {/* Registration form element */}
          {/* used react-hook-form - handleSubmit to prevent default behaviour */}
          <form
            className="py-8 flex flex-col gap-5"
            onSubmit={handleSubmit(submitRegisterData)}
          >
            <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
              {/* custom Text input is here to achieve re-useability and easy styling of component and similar content */}
              {/* Setting up our Custom Text input for first name */}
              <TextInput
                name="firstName"
                label="First Name"
                placeholder="First Name"
                type="firstName"
                register={register("firstName", {
                  required: "First Name is required",
                })}
                styles="rounded-lg w-full"
                error={errors.firstName ? errors.firstName?.message : ""}
              />
              {/* Setting up our Custom Text input for last name */}
              <TextInput
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                type="lastName"
                register={register("lastName", {
                  required: "Last Name is required",
                })}
                styles="rounded-lg w-full"
                error={errors.lastName ? errors.lastName?.message : ""}
              />
            </div>
            {/* Setting up our Custom Text input for email input */}
            <TextInput
              name="email"
              placeholder="email@example.com"
              type="email"
              label="Email Address"
              register={register("email", {
                required: "Email address is required",
                validate: validateEmail,
              })}
              styles="rounded-lg w-full"
              error={errors.email ? errors.email?.message : ""}
            />
            {/* Setting up the Custom Text input for password fields */}
            <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
              <TextInput
                name="password"
                placeholder="Password"
                type="password"
                label="Password"
                register={register("password", {
                  required: "Password is required",
                  validate: validatePassword,
                })}
                styles="rounded-lg w-full"
                error={errors.password ? errors.password?.message : ""}
              />
              {/* Setting up the Custom Text input for repeat password */}
              <TextInput
                name="password"
                placeholder="Password"
                type="password"
                label="Confirm Password"
                register={register("cPassword", {
                  validate: (value) => {
                    const { password } = getValues();

                    if (password != value) {
                      return "Password do not match";
                    }
                  },
                })}
                styles="rounded-lg w-full"
                error={
                  errors.cPassword && errors.cPassword.type === "validate"
                    ? errors.cPassword?.message
                    : ""
                }
              />
            </div>

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

            {/* display loading state */}
            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                title="Create Account"
              />
            )}
          </form>
          {/* Login link */}
          <p className="text-ascent-2 text-sm text-center">
            Already have an account?
            <Link
              to="/login"
              className="text-[#065ad8] font-semibold ml-2 cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
        {/* ----- right area with background image-------- */}

        <div className="hidden w-1/2 h-auto lg:flex flex-col items-center justify-end bg-[#4044a9] bg-opacity-50 bg-cover bg-center bg-no-repeat bg-blend-darken bg-[url('/assets/reg.png')]">
          {/* image and icons div area */}

          {/* -----------text below picture area-------------- */}

          <div className="mb-40 text-center z-30">
            <p className="text-[#fff] font-semibold text-2xl">
              Connect with friends & share memories
            </p>
            <span className="text-base text-[#fff]/60">
              capture your thoughts and favorite moments and share with the
              world
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
