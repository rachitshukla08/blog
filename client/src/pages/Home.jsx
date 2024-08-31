import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";
import { Button } from "flowbite-react";
import emailjs from "@emailjs/browser";
import { useDispatch, useSelector } from "react-redux";
import { setRequestedAdminAccess } from "../redux/user/userSlice";

const Home = () => {
  const form = useRef();
  const [posts, setPosts] = useState();
  const { currentUser, requestedAdminAccess } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  const sendEmail = async ({
    to_name,
    from_name,
    message,
    user_name,
    user_email,
  }) => {
    try {
      const templateParams = {
        user_name,
        to_name,
        user_email,
        message,
        from_name,
      };
      const res = await emailjs.send(
        "service_tt10ckp",
        "template_6wv7z8g",
        templateParams,
        {
          publicKey: "P2XfdPr5BbF7eXQlO",
        }
      );
      if (res.status === 200) {
        dispatch(setRequestedAdminAccess(true));
        alert(
          "Successfully sent your request. Please wait for some time to get access"
        );
      } else {
        alert("Some error occurred please try again");
      }
    } catch (error) {
      alert("Some error occurred please try again");
      console.log(error);
    }
  };

  const handleRequestAccess = async () => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }
    if (currentUser.isAdmin) {
      alert("Already an admin");
      return;
    }
    if (requestedAdminAccess === true) {
      alert("Already requested admin access, please wait");
      return;
    }
    const to_name = "Rachit";
    const { username: user_name, email: user_email } = currentUser;
    const from_name = "InDepthBlogsRachit";
    const message = "Please approve my admin request";
    await sendEmail({ to_name, from_name, message, user_name, user_email });
  };

  return (
    <div className="bg-custom bg-custom-home">
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
          <div className="flex flex-col items-center gap-2 text-gray-900">
            <p className="text-xs uppercase font-semibold mt-4 dark:text-gray-300 tracking-wider text-center">
              NOTE: Limited access/features are provided to non admin users.
            </p>
            <p className="text-xs uppercase font-semibold dark:text-gray-300 tracking-wider text-center">
              Please request the admin access by clicking the following button
            </p>
          </div>
          <Button
            outline
            gradientDuoTone="purpleToBlue"
            size="xs"
            onClick={handleRequestAccess}
          >
            Request Access
          </Button>
        </div>
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
      <div className="max-w-6xl mx-auto p-3 sm:mb-28 mb-10">
        <CallToAction />
      </div>
    </div>
  );
};

export default Home;
