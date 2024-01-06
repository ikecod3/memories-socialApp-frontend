/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { TbSocial } from "react-icons/tb";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { BsMoonStars, BsSunFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SetTheme } from "../reduxSlice/theme";
import { logout } from "../reduxSlice/userSlice";
import { fetchPosts } from "../utils";

const NavBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // handles form submit behavior
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const handleSearch = async (data) => {
    await fetchPosts(user.token, dispatch, "", data);
  };

  // toggle theme light and dark mode
  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";
    dispatch(SetTheme(themeValue));
  };

  // handle Logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="w-full px-0 lg:px-10 2xl:px-40 shadow-lg sticky top-0 z-50 ">
      <div className="navBar mx-auto w-full bg-primary flex items-center justify-between py-3 md:py-4 px-4">
        <Link to="/" className="flex gap-2 items-center">
          <div className="p-1 md:p-2 bg-[#065ad8] rounded text-white">
            <HiMiniViewfinderCircle />
          </div>
          <span className="text-xl md:text-2xl text-[#065ad8] font-semibold">
            Memories
          </span>
        </Link>

        {/* search bar UI functionality */}
        <form
          onSubmit={handleSubmit(handleSearch)}
          className="hidden md:flex items-center justify-center"
        >
          <TextInput
            placeholder="Search..."
            styles="w-[20rem] lg:w-[28rem] rounded-l-full py-3"
            register={register("search")}
          />

          <CustomButton
            title="Search"
            type="submit"
            containerStyles="bg-[#0444a4] text-white px-6 py-3 mt-2 rounded-r-full"
          />
        </form>

        {/* icons for theme toggler, ntoifications and logout */}
        <div className="flex gap-4 space-x-4 items-center text-ascent-1 text-md md:text-xl">
          {/* switching the  toggle icon */}
          <button onClick={() => handleTheme()}>
            {theme === "light" ? <BsMoonStars /> : <BsSunFill />}
          </button>

          {/* some dummy notifications icons */}
          <div className="hidden lg:flex">
            <IoMdNotificationsOutline size={28} />
          </div>

          {/* logout button */}
          <div>
            <CustomButton
              onClick={handleLogout}
              title="Logout"
              containerStyles="text-sm align-middle text-ascent-2 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
