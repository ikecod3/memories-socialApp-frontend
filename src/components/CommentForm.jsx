/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NoProfile } from "../assets";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import { apiRequest } from "../utils";

const CommentForm = ({ user, id, replyAt, getComments }) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrMsg("");
    try {
      const URL = !replyAt
        ? "/posts/comment/" + id
        : "/posts/reply-comment/" + id;

      const newData = {
        comment: data?.comment,
        from: user?.firstName + " " + user?.lastName,
        replyAt: replyAt,
      };

      const res = await apiRequest({
        url: URL,
        data: newData,
        token: user?.token,
        method: "POST",
      });

      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        reset({
          comment: "",
        });
        setErrMsg("");
        await getComments();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
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

        {/* when replyAt props is passed redner placeholder with @  fetch userId where it is invoke or render default text */}
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
        {/* display loading state */}
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
