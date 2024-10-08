import { Sidebar } from "flowbite-react";
import React from "react";
import {
  HiAnnotation,
  HiArrowSmRight,
  HiChartBar,
  HiChartPie,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
} from "react-icons/hi";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";

const DashboardSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    const res = await fetch("api/user/signout", {
      method: "POST",
    });
    const data = await res.json();
    if (!res.ok) console.log(data.message);
    else dispatch(signOutSuccess());
  };

  return (
    <Sidebar className="w-full md:min-w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser?.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to={"/dashboard?tab=posts"}>
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to={"/dashboard?tab=users"}>
              <Sidebar.Item
                active={tab === "users"}
                icon={HiOutlineUserGroup}
                as="div"
              >
                Users
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to={"/dashboard?tab=comments"}>
              <Sidebar.Item
                active={tab === "comments"}
                icon={HiAnnotation}
                as="div"
              >
                Comments
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to={"/dashboard?tab=dash"}>
              <Sidebar.Item
                active={tab === "dash" || !tab}
                icon={HiChartBar}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}

          <Sidebar.Item
            onClick={handleSignOut}
            icon={HiArrowSmRight}
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashboardSidebar;
