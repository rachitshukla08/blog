import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { Button } from "flowbite-react";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  return (
    <div className="group relative w-full shadow-sm dark:bg-[rgb(19,32,61)] border dark:border-[rgb(21,42,98)] dark:shadow-[rgb(11, 18, 41)] h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-gray-500 text-xs">
          {moment(post.createdAt).fromNow()}
        </p>
        {/* <div className="flex justify-between"> */}
        <p className="text-lg font-semibold line-clamp-2">{post.title} </p>
        {/* </div> */}
        <Button
          gradientDuoTone="purpleToBlue"
          outline
          rounded
          size="xs"
          className="w-fit uppercase  "
          onClick={() => {
            navigate(`/search?category=${post.category}`);
          }}
        >
          <span className="text-[10px] tracking-widest">{post.category}</span>
        </Button>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
