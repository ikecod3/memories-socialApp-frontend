/* Disable exhaustive-deps warning for React hooks to avoid unnecessary warnings */
/* eslint-disable react-hooks/exhaustive-deps */
/* Disable unused-vars warning for specific imports */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  AdvertCard,
  CustomButton,
  EditProfile,
  FriendsCard,
  Loading,
  ProfileCard,
  TextInput,
  UsersPostCard,
} from "../../components";
import { NoProfile } from "../../assets";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { BiCheck, BiCheckDouble, BiImages, BiSolidVideo } from "react-icons/bi";
import {
  apiRequest,
  deletePost,
  fetchPosts,
  getUserInfo,
  handleFileUpload,
  likePost,
  sendFriendRequest,
  viewedUserProfile,
} from "../../utils";
import { UserLogin } from "../../reduxSlice/userSlice";

const Home = () => {
  // Redux state and dispatch setup
  const { user, edit } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  // State variables for managing friend requests, suggested friends, file uploads, errors, and posting status
  // state to set and update friend request list
  const [friendRequest, setFriendRequest] = useState([]);

  // state to set and update suggested friends list
  const [suggestedFriends, setSuggestedFriends] = useState([]);

  // files upload state
  const [file, setFile] = useState(null);
  // error state
  const [errMsg, setErrMsg] = useState("");
  // state for posting
  const [isPosting, setIsPosting] = useState(false);
  const [loading, setLoading] = useState(false);

  // react hook handle entire form and error state
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // Function to handle post creation.
  const handleCreatePost = async (data) => {
    // console.log("Create post should be working");
    setIsPosting(true);
    setErrMsg("");

    try {
      // if there is a file - upload the file first and await it..if the uri is truthy append it inside the data existing object otherwise use the existing data

      const uri = file && (await handleFileUpload(file));

      const newData = uri ? { ...data, image: uri } : data;

      const res = await apiRequest({
        url: "posts/create-post",
        data: newData,
        token: user?.token,
        method: "POST",
      });

      // ensure the required data is sent back
      if (res?.status === "failed") {
        // if the response fials , log the result to setErrMsg
        setErrMsg(res);
      } else {
        // otherswise reset the form field
        reset({
          description: "",
        });
        // when the response is succesful set file and ErrMsg to null
        setFile(null);
        setErrMsg("");

        await handleFetchPost();
      }

      setIsPosting(false);
    } catch (error) {
      console.log(error);
      setIsPosting(false);
    }
  };

  // Function to fetch posts.
  const handleFetchPost = async () => {
    await fetchPosts(user?.token, dispatch);
    setLoading(false);
  };

  // Function to handle post likes.
  const handleLikePost = async (uri) => {
    // wait for the action to complete
    await likePost({
      method: "POST",
      uri: uri,
      token: user?.token,
    });
    // re-fecth the post to update the current like action on the UI
    await handleFetchPost();
  };

  // Function to handle post deletion.
  const handleDeletePost = async (id) => {
    // delete the post
    await deletePost(id, user.token);
    // toast message to confirm post deletion was successful
    toast.success("post deleted successfully", {
      position: "top-center",
    });
    // refresh the available pot
    await handleFetchPost();
  };

  // Function to fetch friend requests
  const fetchFriendRequests = async () => {
    try {
      const res = await apiRequest({
        url: "/users/get-friend-request",
        token: user?.token,
        method: "POST",
      });
      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch suggested friends.
  const fetchSuggestedFriends = async () => {
    try {
      const res = await apiRequest({
        // pass the endpoint to utilities function
        url: "/users/suggested-friends",
        token: user?.token,
        method: "POST",
      });
      // set the response data to friendRequest state
      setSuggestedFriends(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle sending friend requests.
  const handleFriendRequest = async (id) => {
    try {
      // perform the friendreqeust action using sendFriendRequest from utils
      const res = await sendFriendRequest(user.token, id);

      // toast message to confirm post deletion was successful
      toast.success("friend request sent", {
        duration: 2000,
        position: "top-right",
      });
      // reloads the suggested friends list with new data
      await fetchSuggestedFriends();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to accept or deny friend requests.
  const acceptFriendRequest = async (id, status) => {
    try {
      const res = await apiRequest({
        url: "/users/accept-request",
        token: user?.token,
        method: "POST",
        data: { rid: id, status },
      });
      // toast message to confirm post deletion was successful
      toast("friend request accepted", {
        duration: 2000,
        position: "top-right",
      });
      // update the friendrequest state with the response data
      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  // function to handle user profile view count
  const handleViewProfile = async (id) => {
    // the the profile belongs to the current user do nothing
    if (id === user?._id) {
      return;
    }
    await viewedUserProfile(user?.token, id);
  };

  // Function to get user information.
  const getUser = async () => {
    // invoke the getUserInfo fron utils and pass the user token
    const res = await getUserInfo(user?.token);

    const newData = { token: user?.token, ...res };
    dispatch(UserLogin(newData));
  };

  // useEffect to handle initial data fetching.
  useEffect(() => {
    setLoading(true);
    getUser();
    handleFetchPost();
    fetchFriendRequests();
    fetchSuggestedFriends();
  }, []);

  return (
    <>
      {/* main content wrapper for the home page */}
      <Toaster />
      <div className="home w-full px-0 lg:px-10 pb-16 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden fixed">
        {/* home content wrapper/container  */}

        <div className="w-full flex gap-2 lg:gap-4 pt-4 pb-10 h-full">
          {/* LEFT SIDE CONTENT */}
          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-4 overflow-auto">
            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />
          </div>
          {/* CENTER CONTENT */}
          <div className="flex flex-col gap-4 flex-1 h-full px-4 overflow-y-auto rounded-lg ">
            {/* ---------create post form ----------------- */}
            <form
              onSubmit={handleSubmit(handleCreatePost)}
              className="bg-primary px-4 rounded-b-lg sticky top-0 z-40 "
            >
              <div className="w-full flex items-center gap-2 py-2 border-b border-[#66666645]">
                <img
                  src={user?.profileUrl ?? NoProfile}
                  alt="User Image"
                  className="w-14 h-14 rounded object-cover "
                />

                <TextInput
                  styles="w-full rounded-xl py-5"
                  placeholder="What's on your mind..."
                  name="description"
                  register={register("description", {
                    required: "Write something about post",
                  })}
                  error={errors.description ? errors.description.message : ""}
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

              <div className="flex items-center justify-between py-4">
                {/* image upload icon */}
                <label
                  htmlFor="imgUpload"
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer "
                >
                  <input
                    type="file"
                    onChange={(ev) => setFile(ev.target.files[0])}
                    className="hidden"
                    id="imgUpload"
                    data-max-size="5120"
                    accept=".jpg, .png, .jpeg"
                  />
                  <BiImages />
                  {/* show checked icon when an image is selected */}
                  {file && <BiCheckDouble color="green" size={30} />}
                  <span>Image</span>
                </label>
                {/* video upload icon */}
                <label
                  htmlFor="videoUpload"
                  className="hidden sm:flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(ev) => setFile(ev.target.files[0])}
                    className="hidden"
                    id="videoUpload"
                    data-max-size="5120"
                    accept=".mp4, .wav .mov"
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>
                {/* gif upload icon */}
                <label
                  htmlFor="vgifUpload"
                  className="hidden sm:flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(ev) => setFile(ev.target.files[0])}
                    className="hidden"
                    id="vgifUpload"
                    data-max-size="5120"
                    accept=".gif"
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                </label>

                {/* display loading state */}
                <div>
                  {isPosting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type="submit"
                      containerStyles={`bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm`}
                      title="Post"
                    />
                  )}
                </div>
              </div>
            </form>

            {/*  Each post card is defined here */}
            {/* checking loading state then map through array of post from database if post is not available i.e length is less than zero display post no found otherwise map over the array on postcard  */}
            <div className="">
              {loading ? (
                <Loading />
              ) : posts?.length > 0 ? (
                posts?.map((post) => (
                  <UsersPostCard
                    key={post?._id}
                    post={post}
                    user={user}
                    deletePost={handleDeletePost}
                    likePost={handleLikePost}
                    viewProfile={handleViewProfile}
                  />
                ))
              ) : (
                <div className="flex w-full items-center justify-center">
                  <p className="text-lg text-ascent-2">No Post Available</p>
                </div>
              )}
            </div>
          </div>
          {/* RIGHT SIDE CONTENT */}
          <div className=" hidden w-1/4 h-gull lg:flex flex-col gap-8 overflow-y-auto">
            {/* FRIENDS REQUEST  */}

            {/* displat friend request div only when user have a frienf request */}
            {friendRequest?.length > 0 && (
              <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
                <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
                  <span>Friend Request</span>
                  <span>{friendRequest?.length}</span>
                </div>

                {/* friend request card & details */}
                <div className="w-full flex flex-col gap-4 pt-4">
                  {friendRequest?.map(({ _id, requestFrom: from }) => (
                    <div
                      key={_id}
                      className="flex items-center justify-between"
                    >
                      <Link
                        to={"/profile" + from?._id}
                        className="w-full flex gap-4 items-center cursor-pointer"
                      >
                        {/* friend request image */}
                        <img
                          src={from?.profileUrl ?? NoProfile}
                          alt={from?.firstName}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        {/* friend request information */}
                        <div className="flex-1">
                          <p className="text-base font-medium text-ascent-1">
                            {from?.firstName} {from?.lastName}
                          </p>
                          <span className="text-sm text-ascent-2">
                            {from?.profession ?? "No Profession"}
                          </span>
                        </div>
                      </Link>

                      {/* accept or reject friend request button  */}
                      <div className="flex gap-1">
                        <CustomButton
                          title="Accept"
                          containerStyles="bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full"
                          onClick={() => acceptFriendRequest(_id, "Accepted")}
                        />
                        <CustomButton
                          title="Deny"
                          containerStyles="border border-[#666] text-xs text-ascent-1 px-1.5 py-1 rounded-full"
                          onClick={() => acceptFriendRequest(_id, "Denied")}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* SUGGESTED FRIENDS */}
            <div className="w-full bg-primary shadow-sm rounded-lg px-5 py-5">
              <div className="flex items-center justify-between text-xl text-ascent-1 border-b border-[#66666645]">
                <span>People you may know</span>
              </div>

              <div className="w-full flex flex-col gap-4 pt-4">
                {suggestedFriends?.map((friend) => (
                  <div
                    key={friend._id}
                    className="flex items-center justify-between"
                  >
                    <Link
                      to={"/profile" + friend._id}
                      className="w-full flex gap-4 items-center cursor-pointer"
                    >
                      {/* friend request image */}
                      <img
                        src={friend?.profileUrl ?? NoProfile}
                        alt={friend?.firstName}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      {/* friend request information */}
                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">
                          {friend?.firstName} {friend?.lastName}
                        </p>
                        <span className="text-sm text-ascent-2">
                          {friend?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className="flex gap-1">
                      <button
                        className="bg-[#0444a430] text-sm text-white p-1 rounded"
                        onClick={() => handleFriendRequest(friend?._id)}
                      >
                        <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* ADVERTIZEMENT CARD */}
            {/* dislay advertizment div only friend request is less than two */}
            {friendRequest?.length < 2 && <AdvertCard />}
          </div>
        </div>
      </div>
      {/* MODAL CLASS */}
      {/* show modal when is edit is set to true - edit is trigger from the user state. */}
      {edit && <EditProfile />}
    </>
  );
};

export default Home;
