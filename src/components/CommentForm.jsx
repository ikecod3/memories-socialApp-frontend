/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NoProfile } from "../assets";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import { apiRequest } from "../utils";

/**
 * CommentForm Component
 * -props {Object} user - User object containing user details.
 * -props {string} id - ID of the post for which the comment is being added.
 * -props {string} replyAt - Optional: ID of the comment being replied to.
 * -props {function} getComments - Callback function to fetch and update comments after submitting.
 */

const CommentForm = ({ user, id, replyAt, getComments }) => {
  // state variables for managing loading and error messages
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  /**
   * Handle form submission
   * -param {Object} data contain form data containing the comment text.
   */
  const onSubmit = async (data) => {
    setLoading(true);
    setErrMsg("");
    // dynamically determine the API endpoint based on whether it's a new comment or a reply
    try {
      const URL = !replyAt
        ? "/posts/comment/" + id
        : "/posts/reply-comment/" + id;
      // prepare the data to be sent in the request body
      const newData = {
        comment: data?.comment,
        from: user?.firstName + " " + user?.lastName,
        replyAt: replyAt,
      };
      // Make an API  POST request to add the comment or reply
      const res = await apiRequest({
        url: URL,
        data: newData,
        token: user?.token,
        method: "POST",
      });
      // manage the response from the server if status failed or otherwise
      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        // reset the form, clear errors, and update comments on successful submission
        reset({
          comment: "",
        });
        setErrMsg("");
        // re-fetch updated comments after submission
        await getComments();
      }
      // set loading state to false after the request is processed
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Render the comment form
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full border-b border-[#66666645]"
    >
      <div className="w-fll flex items-center gap-2 py-4">
        <img
          src={user?.profileUrl ?? NoProfile}
          alt="user Image"
          className="w-10 h-10 rounded-full object-cover"
        />
        {/* Render the text input for comments or replies */}
        {/* when comment is not empty replyAt props truthy and rendered as placeholder with @ comment creator information */}

        <TextInput
          name="comment"
          styles="w-full rounded-full py-3"
          placeholder={replyAt ? `Reply @${replyAt}` : "Comment on this post"}
          register={register("comment", {
            required: "Comment cannot be empty",
          })}
          error={errors.comment ? errors.comment.message : ""}
        />
      </div>
      {/* display error message if any */}
      {errMsg?.message && (
        <span
          className={`text-sm ${
            errMsg?.status == "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"
          } mt-0.5`}
        >
          {errMsg?.message}
        </span>
      )}

      <div className="flex items-end justify-end pb-2">
        {/* display loading state or submit button */}
        {loading ? (
          <Loading />
        ) : (
          <CustomButton
            type="submit"
            containerStyles={`bg-[#0444a4] text-white py-1 px-3 rounded-full font-semibold text-sm`}
            title="Submit"
          />
        )}
      </div>
    </form>
  );
};

export default CommentForm;
