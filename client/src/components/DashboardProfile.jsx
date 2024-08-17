import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

const DashboardProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="w-full h-full cursor-pointer rounded-full border-4 object-cover border-gray-200 dark:border-white"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        ></TextInput>
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        ></TextInput>
        <TextInput
          type="password"
          id="password"
          placeholder="*********************"
        ></TextInput>
        <Button type="submit" gradientDuoTone="purpleToPink" outline>
          Update
        </Button>
      </form>
      <div className="text-red-900 dark:text-red-700  flex justify-between mt-5">
        <span className="cursor-pointer hover:text-red-500">Delete</span>
        <span className="cursor-pointer hover:text-red-500">Sign Out</span>
      </div>
    </div>
  );
};

export default DashboardProfile;
