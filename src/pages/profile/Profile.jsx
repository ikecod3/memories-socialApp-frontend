/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  AdvertCard,
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
  const { user } = useSelector((state) => state.user);
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
      <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* LEFT SIDE CONTENT */}
          <div className="hidden xs:w-full sm:w-1/3 lg:w-1/4 h-full sm:flex flex-col gap-4 sm:overflow-auto">
            <ProfileCard user={userInfo} />
            <div className="block lg:hidden">
              <FriendsCard friends={userInfo?.friends} />
            </div>
          </div>
          {/* CENTER CONTENT */}
          <div className="flex flex-col flex-1 h-full px-4 overflow-y-auto rounded-lg">
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
    </>
  );
};

export default Profile;
