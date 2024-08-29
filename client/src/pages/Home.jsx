import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState();
  console.log(posts);
  useEffect(() => {
    console.log("FETCHING");
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="bg-custom">
      <div className="flex justify-center ">
        <div className="flex flex-col gap-6 pb-0 pt-28 sm:p-28 sm:pt-44 px-3 max-w-6xl  items-center md:text-left sm:h-svh max-h-fit sm:max-h-[600px] mt-0 ">
          <h1 className="text-4xl text-center md:text-5xl font-bold lg:text-6xl bg-gradient-to-r from-purple-500 to-cyan-600 max-w-fit text-transparent bg-clip-text uppercase">
            Code Learn Innovate
          </h1>
          <p className="text-slate-700 dark:text-slate-400 text-xs sm:text-sm font-semibold text-center">
            Your go-to resource for tutorials, best practices, and deep dives
            into the latest tech.
          </p>
          <Link
            to="/search"
            className="text-xs sm:text-sm text-cyan-600 hover:underline font-bold"
          >
            View all posts
          </Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-3">
        <CallToAction />
      </div>
      <div className="max-w-7xlxl mx-auto p-3 flex flex-col gap-8 py-7 sm:mt-20 mt-8">
        {posts && posts.length > 0 && (
          <div className=" flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-5 gap-y-10 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
