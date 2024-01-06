/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// import { FcMindMap } from "react-icons/fc";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { CustomButton, Loading, TextInput } from "../../components";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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

  // api call to execute user registration
  const submitRegisterData = async (data) => {
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

        // automatically redirect the user to login page after 5secs
        setTimeout(() => {
          // window.location.replace("/login");
          navigate("/login");
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
          {/* used react-hook-form - handleSubmit to prevent default behaviour */}
          <form
            className="py-8 flex flex-col gap-5"
            onSubmit={handleSubmit(submitRegisterData)}
          >
            <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
              {/* custom Text input is here to achieve re-useability and easy styling of component and similar content */}
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
            {/* password field */}
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

        <div className="hidden w-1/2 h-auto lg:flex flex-col items-center justify-end bg-[#4044a9] bg-opacity-50 bg-cover bg-center bg-no-repeat bg-blend-darken bg-[url('src/assets/reg.png')]">
          {/* image and icons div area */}

          {/* -----------text below picture area-------------- */}

          <div className="mb-40 text-center z-30">
            <p className="text-[#231c62] font-semibold text-2xl">
              Connect with friends & share memories
            </p>
            <span className="text-base text-[black]/60">
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
