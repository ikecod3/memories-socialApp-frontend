/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

// added functionality if response is success disable the send email button

import { useForm } from "react-hook-form";
import { CustomButton, Loading, TextInput } from "../../components";
import { useState } from "react";
import { apiRequest } from "../../utils";
import { Link } from "react-router-dom";

// ResetPassword Component: Handles the password reset functionality
// --------------------------------------------------------------
const ResetPassword = () => {
  // State variables to manage form submission and display of error messages
  const [errMsg, setErrMsg] = useState(); // Manages and displays registration form error state
  const [isSubmitting, setIsSubmitting] = useState(false); // Manages user data submission state
  const [sendEmail, setSendEmail] = useState(true); // Controls the send email button state

  // useForm hook to handle the entire form and error state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // Function to request a password reset for a user's email
  const handleResetPassword = async (data) => {
    setIsSubmitting(true);
    try {
      // Sending a request to the endpoint for password reset
      const res = await apiRequest({
        url: "/users/request-passwordreset",
        data: data,
        method: "POST",
      });
      // Check the response status and update state accordingly
      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg(res);
        setSendEmail(false);
      }

      // when an error occured reset submission state
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-[black] flex items-center justify-center p-6 bg-blend-darken bg-opacity-80 bg-cover bg-no-repeat bg-[url('https://img.freepik.com/premium-vector/frustrated-man-touching-his-head-holding-phone-trying-remember-forgets-password-account_199628-198.jpg?w=826')]">
      {/*--------form container------------------ */}
      <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
        <p className="text-ascent-1 text-lg font-semibold">Email Address</p>

        <span className="text-sm text-ascent-2">
          Enter the email address associated with your account
        </span>

        {/* FORM handleSubmit is from useForm hook - It is used to manage the whole form state */}
        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="py-4 flex flex-col gap-5"
        >
          {/* email input input */}
          <TextInput
            name="email"
            placeholder="email@maildomain.com"
            type="email"
            register={register("email", {
              required: "Email address is required",
            })}
            styles="rounded-lg w-full"
            labelStyles="ml-2"
            error={errors.email ? errors.email?.message : ""}
          />

          {/* display error message if any */}
          {errMsg?.message && (
            <span
              role="alert"
              className={`text-sm ${
                errMsg?.status == "failed"
                  ? "text-[#f64949fe]"
                  : "text-[#2ba150fe]"
              } mt-0.5`}
            >
              {errMsg?.message}
            </span>
          )}

          {/* send password reset email action button */}
          {sendEmail ? (
            isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-xs md:text-sm font-medium text-white outline-none`}
                title="Send Reset Password Email"
              />
            )
          ) : (
            <Link to="/login" className="w-full">
              <CustomButton
                containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-xs md:text-sm font-medium text-white outline-none`}
                title="Return to Login Page"
              />
            </Link>
          )}
        </form>
      </div>
    </div>
  );
};

// Export the ResetPassword component
export default ResetPassword;
