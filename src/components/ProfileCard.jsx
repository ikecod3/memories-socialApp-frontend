/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";

import { BsPersonFillAdd } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import moment from "moment";
import { UpdateProfile } from "../reduxSlice/userSlice";
import { ImBriefcase } from "react-icons/im";
import {
  BehanceOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Space, Tag } from "antd";

// ProfileCard component displays user profile information
const ProfileCard = ({ user }) => {
  const dispatch = useDispatch();
  const { user: data, edit } = useSelector((state) => state.user);

  // Opens the profile editing mode
  const handleEditProfile = () => {
    dispatch(UpdateProfile(true));
  };
  // Sends a friend request to the user
  const handleSendFriendRequest = () => {};

  return (
    <div>
      {/* Main profile card container */}
      <div className="w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4 mb-2">
        {/* Header section with user details and edit button */}
        <div className="w-full flex items-center justify-between border-b pb-5 gap-8 border-[#66666645]">
          {/* profle image, name and profession */}
          <Link
            to={"/profile/" + user?._id}
            className="flex gap-2 justify-around items-center"
          >
            <img
              src={user?.profileUrl ?? NoProfile}
              alt={user?.email}
              className="w-14 h-14 object-cover rounded-full"
            />

            <div className="flex flex-col justify-between">
              <p className="text-lg font-medium text-ascent-1">
                {user?.firstName} {user?.lastName}
              </p>
              <span className="text-ascent-2 text-sm">
                {user?.profession ?? "No Profession"}
              </span>
            </div>
          </Link>

          {/* ----display Edit profile or send friend request button---------- */}
          <div className="">
            {user?._id == data?._id ? (
              <FaUserEdit
                size={22}
                className="text-blue cursor-pointer"
                onClick={handleEditProfile}
              />
            ) : (
              <button
                className="bg-[#0444a430] text-sm text-white p-1 rounded"
                onClick={handleSendFriendRequest}
              >
                <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
              </button>
            )}
          </div>
        </div>
        {/* ------ Location and profession section--------- */}
        <div className="w-full flex flex-col gap-2 py-3 border-b border-[#66666645]">
          <div className="flex gap-4 items-center text-ascent-2">
            <CiLocationOn className="text-xl text-ascent-1" />
            <span> {user?.location ?? "Add Location"}</span>
          </div>
          {/* professon area */}
          <div className="flex gap-4 items-center text-ascent-1">
            <ImBriefcase className="text-lg text-ascent-1" />
            <span>{user?.profession ?? "Add Profession"}</span>
          </div>
        </div>

        {/* --------------------- */}
        {/* Friends, profile views, verified status, and account creation date section */}
        <div className="w-full flex flex-col gap-2 py-4 space-y-1 border-b border-[#66666645]">
          <p className="text-lg text-ascent-1 font-semibold">
            {user?.friends?.length} friends
          </p>

          {/* ------viewed profile count----- */}
          <div className="flex items-center justify-between flex-wrap">
            <span className="text-ascent-1 ">Profile views</span>
            <span className="text-ascent-1 text-xl">{user?.views?.length}</span>
          </div>

          {/* verified account status area */}
          <div className="flex items-center justify-between">
            <span className="text-md text-blue">
              {user?.verified ? "Verified" : "Not Verified"}
            </span>
            <span>
              {user?.verified ? (
                // Render verified badge if the account is verified
                <HiOutlineCheckBadge color="blue" size={24} />
              ) : (
                // Empty span if the account is not verified
                " "
              )}
            </span>
          </div>

          {/* -----------Date account was created area---------- */}
          <div className="flex items-center justify-between">
            <span className="text-ascent-2 opacity-70">Joined</span>
            <span className="text-ascent-1 text-base">
              {moment(user?.createdAt).fromNow()}
            </span>
          </div>
        </div>
        {/* Social media links section */}
        <div className="w-full flex items-center justify-center flex-col gap-4 py-4 sm:pb-0">
          <Space
            size={[0, 9]}
            wrap
            className="flex items-center sm:space-x-2 justify-start sm:justify-center cursor-pointer "
          >
            <Tag
              bordered
              icon={<BehanceOutlined />}
              color="blue-inverse"
              className="cursor-pointer text-xs sm:text-sm"
            >
              Behance
            </Tag>
            <Tag
              icon={<YoutubeOutlined />}
              color="#cd201f"
              className="cursor-pointer text-xs sm:hidden"
            >
              Youtube
            </Tag>
            <Tag
              icon={<LinkedinOutlined />}
              color="#55acee"
              className="cursor-pointer text-xs sm:text-sm"
            >
              LinkedIn
            </Tag>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
