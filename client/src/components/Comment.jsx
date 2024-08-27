import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3  ">
        <img
          className="w-10 h-10 rounded-full object-cover bg-gray-200"
          src={user?.profilePicture}
          alt={user?.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "Anonymous/Deleted user"}
          </span>
          <span className="text-gray-500 text-sm">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 mb-2 dark:text-gray-300 text-sm">
          {comment.content}
        </p>
        <div className="flex items-center gap-2 text-xs pt-2">
          <button
            className={`text-gray-400 hover:text-cyan-500 ${
              currentUser && comment.likes.includes(currentUser._id)
                ? "!text-blue-600"
                : ""
            }`}
            type="button"
            onClick={() => onLike(comment._id)}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-500">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
