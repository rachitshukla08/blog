import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineAnnotation,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardStatistics = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState();
  const [totalPosts, setTotalPosts] = useState();
  const [totalComments, setTotalComments] = useState();
  const [lastMonthsUsers, setLastMonthsUsers] = useState();
  const [lastMonthsPosts, setLastMonthsPosts] = useState();
  const [lastMonthsComments, setLastMonthsComments] = useState();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthsUsers(data.lastMonthUsers);
        }
      } catch (err) {
        console.error(err);
      }
    };
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?limit=5");
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
        setLastMonthsPosts(data.lastMonthPosts);
      }
    };
    const fetchComments = async () => {
      const res = await fetch("/api/comment/getcomments?limit=5");
      const data = await res.json();
      if (res.ok) {
        setComments(data.comments);
        setTotalComments(data.totalComments);
        setLastMonthsComments(data.lastMonthComments);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);
  return (
    <div className="p-3 md:mx-auto mt-5">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-cyan-500 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthsUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiOutlineAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthsComments}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-500 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthsPosts}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      {/* TABLES */}
      <div className="flex flex-wrap gap-4 justify-center w-full mt-10 ">
        <div className="flex flex-col w-full md:w-auto shadow-sm p-2 rounded-md bg-slate-100 dark:bg-slate-800 max-w-lg flex-1">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent users</h1>
            <Button outline gradientDuoTone="purpleToBlue">
              <Link to={"/dashboard?tab=users"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>User Name</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users?.map((user) => (
                <Table.Row
                  key={user._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      className="w-10 h-10 bg-gray-500 rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-sm p-2 rounded-md bg-slate-100 dark:bg-slate-800 max-w-lg">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button outline gradientDuoTone="purpleToBlue">
              <Link to={"/dashboard?tab=comments"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {comments?.map((comment) => (
                <Table.Row
                  key={comment._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    <p className="line-clamp-2">{comment.content}</p>
                  </Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        {/*  */}
        <div className="flex flex-col w-full md:w-auto shadow-sm p-2 rounded-md bg-slate-100 dark:bg-slate-800 flex-1 min-w-80 max-w-lg">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent posts</h1>
            <Button outline gradientDuoTone="purpleToBlue">
              <Link to={"/dashboard?tab=posts"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {posts?.map((post) => (
                <Table.Row
                  key={post._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    <img src={post.image} className="w-14 h-10 bg-gray-500" />
                  </Table.Cell>
                  <Table.Cell>
                    <p className="line-clamp-2">{post.title}</p>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatistics;
