/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import moment from "moment";
import { BiLike, BiSolidLike } from "react-icons/bi";

/* eslint-disable no-unused-vars */
const ReplyCard = ({ reply, user, handleLike }) => {
  return (
    <div className="w-full py-3 ">
      <div className="flex gap-3 items-center mb-1">
        {/* profile image */}
        <Link to={"/profile/" + reply?.user?._id}>
          <img
            src={reply?.userId?.profileUrl ?? NoProfile}
            alt={reply?.userId?.firstName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>
        {/* name and reply moment */}
        <div>
          <Link to={"/profile/" + reply?.user?._id}>
            <p className="font-medium text-base text-ascent-1">
              {reply?.userId?.firstName} {reply?.userId?.lastName}
            </p>
          </Link>
          <span className="text-ascent-2 text-sm">
            {moment(reply?.createdAt).fromNow()}
          </span>
        </div>
      </div>

      {/* reply description/content */}
      <div className="ml-12">
        <p className="text-ascent-2">{reply?.comment}</p>
        {/* user action to enable the like a reply */}
        <div className="mt-2 flex gap-6">
          <p
            className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer"
            onClick={handleLike}
          >
            {/* also show number total number of likes */}
            {reply?.likes?.includes(user?._id) ? (
              <BiSolidLike size={20} />
            ) : (
              <BiLike size={20} />
            )}
            {reply?.likes?.length} likes
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReplyCard;
