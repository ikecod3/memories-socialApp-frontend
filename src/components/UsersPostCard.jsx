/* 
  Disable ESLint warnings for prop types and unused variables, 
  as these are intentionally bypassed or will be used in future iterations.
*/
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import moment from "moment";
import CommentForm from "./CommentForm";
import Loading from "./Loading";
import ReplyCard from "./ReplyCard";
import { getPostComments, isImage, isVideo } from "../utils";
import { Image } from "antd";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";

import PopConfirmation from "./PopConfirmation";

/**
 * Component representing a user's post card with associated functionalities.
 * props {Object} user - The user object associated with the post.
 * props {Function} deletePost - Function to delete the post.
 * props {Function} likePost - Function to like the post.
 * props {Object} post - The post object containing post details.
 */

const UsersPostCard = ({ post, user, deletePost, likePost }) => {
  // State variables for managing various aspects of the post card UI
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);

  const [popconfirmVisible, setPopconfirmVisible] = useState(false);

  const handleConfirm = () => {
    // Handle the confirm action here
    console.log("Confirmed!");
    setPopconfirmVisible(false);
  };

  const handleCancel = () => {
    // Handle the cancel action here
    setPopconfirmVisible(false);
  };

  /**
   * Fetches comments for a specific post.
   * using the post ID.
   */
  const getComments = async (id) => {
    setReplyComments(0);
    const results = await getPostComments(id);
    setComments(results);

    setLoading(false);
  };

  /**
   * Handles the like action for a post.
   * using the URI for the like action.
   */
  const handleLike = async (uri) => {
    await likePost(uri);
    await getComments(post?._id);
  };

  return (
    <div className="mb-4 bg-primary p-4 rounded-xl shadow-md">
      {/* Post header section */}
      <div className="flex gap-4 items-center mb-2 ">
        {/* User profile image */}
        <Link to={"/profile/" + post?.userId?._id}>
          <img
            src={post?.userId?.profileUrl ?? NoProfile}
            alt={post?.userId?.firstName}
            className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-full"
          />
        </Link>
        {/* profile name/image and location and when post was created */}
        <div className="w-full flex justify-between">
          <div className="">
            <Link to={"/profile/" + post?.userId?._id}>
              <p className="font-medium textlg text-ascent-1">
                {post?.userId?.firstName} {post?.userId?.lastName}
              </p>
            </Link>
            <span className="text-ascent-2">{post?.userId?.location}</span>
          </div>
          <span className="4xl:hidden flex text-ascent-2 text-sm">
            {moment(post?.createdAt ?? "2024-01-01").fromNow()}
          </span>
        </div>
      </div>
      {/* ------Post content section-------------- */}
      <div>
        {/* show complete or sliced post description */}
        <p className="text-ascent-2 text-justify">
          {showAll === post?._id
            ? post?.description
            : post?.description.slice(0, 300)}

          {/* Show more/less link for long descriptions */}
          {/* when the description length is more than 300 characters */}

          {post?.description?.length > 301 &&
            (showAll === post?._id ? (
              <span
                className="text-blue ml-2 font-medium cursor-pointer"
                onClick={() => setShowAll(0)}
              >
                Show less
              </span>
            ) : (
              <span
                className="text-blue ml-2 font-medium cursor-pointer"
                onClick={() => setShowAll(post?._id)}
              >
                Show more
              </span>
            ))}
        </p>

        {/* Render post image or video */}
        {/* optional chaining to check if the post has an image before attempting to render an <img> element. If the post.image property is truthy, the image is rendered with the specified
         */}
        {post?.image && (
          <>
            {isImage(post.image) ? (
              <Image
                src={post?.image}
                alt="post image"
                className="w-full mt-3 rounded-lg"
              />
            ) : isVideo(post.image) ? (
              <video
                controls
                src={post?.image}
                alt="post video"
                className="w-full mt-3 rounded-lg"
              />
            ) : (
              // Handle other cases (unsupported file types)
              <p>Unsupported file type</p>
            )}
          </>
        )}
      </div>

      {popconfirmVisible && (
        <PopConfirmation
          onConfirm={() => deletePost(post?._id)}
          onCancel={handleCancel}
          message="Do you want to delete this post?"
          confirmText="Yes"
          cancelText="no"
          onblur={handleCancel}
        />
      )}
      {/* like comment and delete post area */}
      <div className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-1 text-base !xs:text-[5px] border-t border-[#66666645]">
        {/* check if the likes include current userId, show a like icon with color red otherwise show outline like icon  */}
        <p
          className="flex gap-2 items-center text-base cursor-pointer"
          onClick={() => handleLike("/posts/like/" + post?._id)}
        >
          {post?.likes?.includes(user?._id) ? (
            <BiSolidLike size={20} color="red" />
          ) : (
            <BiLike size={20} />
          )}
          {post?.likes?.length} likes
        </p>
        {/* comment ui rendering*/}
        <p
          className="flex gap-2 items-center text-base cursor-pointer"
          onClick={() => {
            setShowComments(showComments === post._id ? null : post._id);
            getComments(post?._id);
          }}
        >
          <BiComment size={20} />
          {post?.comments?.length} comments
        </p>
        {/* delete function ui rendering */}
        {/* check if the post belong to the current user berfore delete function is activated */}

        {user?._id == post?.userId._id && (
          <div
            className="flex flex-col sm:flex-row justify-center  items-center text-base text-ascent-2 gap-1 cursor-pointer"
            // onClick={() => deletePost(post?._id)}
            onClick={() => setPopconfirmVisible(true)}
          >
            <MdOutlineDeleteOutline size={20} />
            <span>Delete</span>
          </div>
        )}
      </div>

      {/* COMMENTS SECTION UI REDNERING */}
      {showComments === post?._id && (
        <div className="w-full mt-4 order-t border-[#66666645] pt-4">
          <CommentForm
            user={user}
            id={post?._id}
            getComments={() => getComments(post?._id)}
          />
          {/*  check loading state state.. fetch post and comment seperately. if loading is false and comment is available i.e length is gretaer than zero .. map over comments and render it display it  */}
          {loading ? (
            <Loading />
          ) : comments?.length > 0 ? (
            comments?.map((comment) => (
              <div className="w-full py-2" key={comment?._id}>
                <div className="flex gap-3 items-center mb-1">
                  <Link to={"/profile/" + comment?.userId?._id}>
                    <img
                      src={comment?.userId.profileUrl ?? NoProfile}
                      alt={comment?.userId.lastName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Link>
                  <div>
                    <Link to={"/profile/" + comment?.userId?._id}>
                      <p className="font-medium text-base text-ascent-1">
                        {comment?.userId.firstName} {comment?.userId.lastName}
                      </p>
                    </Link>
                    {/* comment time */}
                    <span className="text-ascent-2 text-sm">
                      {moment(comment?.createdAt ?? "2024-01-01").fromNow()}
                    </span>
                  </div>
                </div>

                {/* show comment description form other users */}
                <div className="ml-12">
                  <p className="text-ascent-2">{comment?.comment}</p>
                  {/* like and reply to a particular comment from user */}
                  <div className="mt-2 flex gap-6">
                    <p
                      className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer"
                      onClick={() => {
                        handleLike("/posts/like-comment/" + comment?._id);
                      }}
                    >
                      {/* nexted comment section. check if the comment belong to the current user and redner the applicable like button color */}
                      {comment?.likes.includes(user?._id) ? (
                        <BiSolidLike size={20} color="blue" />
                      ) : (
                        <BiLike size={20} />
                      )}
                      {comment?.likes?.length} likes
                    </p>
                    {/* sub reply */}
                    <span
                      className="text-blue cursor-pointer"
                      onClick={() => setReplyComments(comment?._id)}
                    >
                      Reply
                    </span>
                  </div>

                  {/* if the reply comments is selected or click.. check if id == a commentsId then display the comment for to allow user create a nested reply */}

                  {replyComments == comment?._id && (
                    <CommentForm
                      user={user}
                      id={comment?._id}
                      replyAt={comment?.from}
                      getComments={() => getComments(post?._id)}
                    />
                  )}
                </div>
                {/* REPLIES */}
                <div className="py-2 px-8 mt-6">
                  {/* check if we have replies, then show replies  */}
                  {comment?.replies?.length > 0 && (
                    // if comment replies exit (greater than zero) show comments and show replies text to render the replies on the comment
                    <p
                      className="text-base text-ascent-1 cursor-pointer"
                      onClick={() =>
                        setShowReply(
                          showReply === comment?.replies?._id
                            ? 0
                            : comment?.replies?._id
                        )
                      }
                    >
                      Show Replies ({comment?.replies?.length})
                    </p>
                  )}

                  {/* unveil show more replies */}
                  {showReply === comment?.replies?._id &&
                    comment?.replies?.map((reply) => (
                      // map the replies over reply card component
                      <ReplyCard
                        key={reply?._id}
                        reply={reply}
                        user={user}
                        handleLike={() =>
                          handleLike(
                            "/posts/like-comment/" +
                              comment?._id +
                              "/" +
                              reply?._id
                          )
                        }
                      />
                    ))}
                </div>
              </div>
            ))
          ) : (
            // Display a message if there are no comments
            <span className="flex text-sm py-4 text-ascent-2 text-center">
              No Comments, be first to comment
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default UsersPostCard;
