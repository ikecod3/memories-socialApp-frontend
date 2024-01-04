/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// import { FcMindMap } from "react-icons/fc";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { CustomButton, Loading, TextInput } from "../../components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BgImage } from "../../assets";
import { BsChatSquareHeart, BsShare } from "react-icons/bs";
import { AiOutlineInteraction, AiOutlineMessage } from "react-icons/ai";
import { ImBubble, ImConnection } from "react-icons/im";
import { apiRequest } from "../../utils";

const Register = () => {
  //   set error message
  const [errMsg, setErrMsg] = useState("");
  // track submitting
  const [isSubmitting, setIsSubmitting] = useState(false);
  // dispatch action from state when fro user login
  const dispatch = useDispatch();
  // handle the entire form data and error state
  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const submitRegisterData = async (data) => {
    // console.log("Registration should be working here");
    setIsSubmitting(true);
    try {
      const res = await apiRequest({
        url: "/auth/register",
        data: data,
        method: "POST",
      });
      // check the response status
      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg(res);
        setTimeout(() => {
          window.location.replace("/login");
        }, 5000);
      }

      // when an error occured
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-primary mx-auto w-full h-[100vh] flex items-center justify-center p-6 ">
      <div className="max-w-6xl flex w-full bg-primary rounded-xl md:2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 overflow-hidden shadow-lg">
        {/* left area */}
        <div className="flex flex-col justify-center w-full h-full lg:w-1/2 p-10 2xl:px-20 ">
          <div className="w-full flex gap-2 items-center mb-6">
            <div className="p-2 bg-[#065ad8] rounded text-white">
              <HiMiniViewfinderCircle />
            </div>
            <span className="text-2xl text-[#065ad8] font-semibold">
              Memories
            </span>
          </div>
          <p className="text-ascent-1 text-base font-semibold">
            Create your account
          </p>
          {/* useed react-hook-form handleSubmit to prevent default behaviour */}
          <form
            className="py-8 flex flex-col gap-5"
            onSubmit={handleSubmit(submitRegisterData)}
          >
            <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
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
              error={errors.email ? errors.email?.message : ""}
            />
            {/* passowrd field */}
            <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
              <TextInput
                name="password"
                placeholder="Password"
                type="password"
                label="Password"
                register={register("password", {
                  required: "Password is required",
                })}
                styles="rounded-lg w-full"
                error={errors.password ? errors.password?.message : ""}
              />

              <TextInput
                name="password"
                placeholder="Password"
                type="password"
                label="Confrim Password"
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
        {/* --------------- right area --------------------- */}

        <div className="hidden w-1/2 h-auto lg:flex flex-col items-center justify-center bg-[#4044a9] bg-opacity-50 bg-cover bg-no-repeat bg-blend-darken bg-[url('C:\Users\iyke6\Desktop\dev\playground\memories\client\src\assets\sharing.jpg')]">
          {/* image and icons div area */}

          <div className="relative w-full flex items-center justify-center">
            {/* image elememt */}
            {/* <img
              src={BgImage}
              alt="Bg Image"
              className="w-56 2xl:w-80 h-56 2xl:h-80 rounded-full object-cover bg-opacity-45"
            /> */}
            {/* share  icon */}
            {/* <div className="absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full">
              <BsShare size={14} />
              <span className="text-xs font-medium">Share</span>
            </div> */}

            {/* connect  */}
            {/* <div className="absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full">
              <ImConnection />
              <span className="text-xs font-medium">Connect</span>
            </div> */}

            {/* interact */}
            {/* <div className="absolute flex items-center gap-1 bg-white bottom-2 left-10 py-2 px-5 rounded-full">
              <AiOutlineMessage />
              <span className="text-xs font-medium">Interact</span>
            </div> */}
          </div>

          {/* -----------text below picture area-------------- */}
          <div className="mt-16 text-center">
            {/* <p className="text-white text-base">
              Connect with friends and loved ones & share memories
            </p>
            <span className="text-sm text-white/60">
              capture your thoughts and favorite moments and share with the
              world
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
