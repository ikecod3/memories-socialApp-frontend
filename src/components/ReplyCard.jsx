/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import moment from "moment";
import { BiLike, BiSolidLike } from "react-icons/bi";

/**
 * ReplyCard component represents a card displaying details of a reply in a comment section thread.
 * It includes information such as user profile image, name, reply timestamp, and the reply content.
 * Users can also like a reply by clicking the like icon.
 *
 * -props {Object} reply - The reply object containing details like user, timestamp, and content.
 * -props {Object} user - The current user object.
 * -props {function} handleLike - Function to handle the like action for the reply.
 */
const ReplyCard = ({ reply, user, handleLike }) => {
  return (
    <div className="w-full py-3 ">
      <div className="flex gap-3 items-center mb-1">
        {/* Displaying user profile image */}
        <Link to={"/profile/" + reply?.user?._id}>
          <img
            src={reply?.userId?.profileUrl ?? NoProfile}
            alt={reply?.userId?.firstName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>
        {/* Displaying user name and reply timestamp */}
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

      {/* Displaying the reply content/description */}
      <div className="ml-12">
        <p className="text-ascent-2">{reply?.comment}</p>
        {/* user action section to enable the liking a reply */}
        <div className="mt-2 flex gap-6">
          <p
            className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer"
            onClick={handleLike}
          >
            {/* Displaying like icon and the total number of likes */}
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
