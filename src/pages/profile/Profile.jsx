/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  AdvertCard,
  EditProfile,
  FriendsCard,
  Loading,
  NavBar,
  ProfileCard,
  UsersPostCard,
} from "../../components";
import { deletePost, fetchPosts, getUserInfo, likePost } from "../../utils";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, edit } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);

  const [userInfo, setUserInfo] = useState(user);
  const [loading, setLoading] = useState(false);

  const uri = "/posts/get-user-post/" + id;
  const getUserProfile = async () => {
    const res = await getUserInfo(user?.token, id);
    setUserInfo(res);
  };

  const getPosts = async () => {
    await fetchPosts(user.token, dispatch, uri);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deletePost(id, user.token);
    await getPosts();
  };

  const handleLikePost = async (uri) => {
    await likePost({ uri: uri, token: user?.token });
    await getPosts();
  };

  useEffect(() => {
    setLoading(true);
    getUserProfile();
    getPosts();
  }, [id]);
  return (
    <>
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

      {/* show modal when is edit is set to true - edit is trigger from the user state. */}
      {edit && <EditProfile />}
    </>
  );
};

export default Profile;
