/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

// React and Redux imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Component imports
import {
  AdvertCard,
  EditProfile,
  FriendsCard,
  Loading,
  ProfileCard,
  UsersPostCard,
} from "../../components";

// Utility functions import
import { deletePost, fetchPosts, getUserInfo, likePost } from "../../utils";

const Profile = () => {
  // Extracting user id from the URL parameters
  const { id } = useParams();

  // Redux state and dispatch setup
  const dispatch = useDispatch();

  // State for user information and loading status
  const { user, edit } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);

  const [userInfo, setUserInfo] = useState(user);
  const [loading, setLoading] = useState(false);

  // URI for fetching user posts
  const uri = "/posts/get-user-post/" + id;

  // Function to fetch user information
  const getUserProfile = async () => {
    const res = await getUserInfo(user?.token, id);
    setUserInfo(res);
  };
  // function to handle re-fectching of posts to ensure user see an updated data each time an action is performed on the UI
  const getPosts = async () => {
    await fetchPosts(user.token, dispatch, uri);
    setLoading(false);
  };
  // function to handle post deletion
  const handleDelete = async (id) => {
    await deletePost(id, user.token);
    await getPosts();
  };
  // function to handle like post
  const handleLikePost = async (uri) => {
    await likePost({ uri: uri, token: user?.token });
    await getPosts();
  };

  // useEffect react hook to perform some action after initial rendering
  useEffect(() => {
    setLoading(true);
    getUserProfile();
    getPosts();
  }, [id]);
  return (
    <>
      {/* Main continer */}
      <div className="home w-full px-0 lg:px-10 pb-16 2xl:px-40 bg-bgColor lg:rounded-lg md:h-screen  overflow-hidden">
        <div className="w-full grid flex-col md:flex md:flex-row sm:overflow-y-auto gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* LEFT SIDE CONTENT */}
          <div className="w-full h-full px-4 md:px-0 md:w-1/3 md:flex md:flex-col md:h-full gap-4 md:overflow-auto">
            <ProfileCard user={userInfo} />
            <div className="block lg:hidden pt-0 xs:pt-4">
              <FriendsCard friends={userInfo?.friends} />
            </div>
          </div>

          {/* CENTER CONTENT */}
          <div className="flex flex-col md:w-2/3 flex-1 h-full px-4 overflow-y-auto rounded-lg">
            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <UsersPostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={() => {
                    handleDelete;
                  }}
                  likePost={() => {
                    handleLikePost;
                  }}
                />
              ))
            ) : (
              <div className="flex w-full items-center justify-center">
                <p className="text-lg text-ascent-2">No Post Available</p>
              </div>
            )}
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className=" hidden w-1/4 h-gull lg:flex flex-col gap-4 overflow-y-auto">
            <FriendsCard friends={userInfo?.friends} />
            <AdvertCard />
          </div>
        </div>
      </div>

      {/* MODAL CLASS */}
      {/* show modal when is edit is set to true - edit is triggered from the user state. */}
      {edit && <EditProfile />}
    </>
  );
};

export default Profile;
