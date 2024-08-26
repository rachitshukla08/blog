import { Button } from "flowbite-react";
import React from "react";

const CallToAction = () => {
  return (
    <div className="mt-28 flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2>Want to learn more about me?</h2>
        <p className="text-gray-500 my-2">
          Check out my Github profile with many more projects
        </p>
        <Button
          gradientDuoTone="purpleToBlue"
          className="rounded-bl-none rounded-tl-xl"
          as="a"
          href="https://github.com/rachitshukla08"
          target="_blank"
        >
          Learn More
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D2DAQGI93SMYCr0kw/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1686499890771?e=1725289200&v=beta&t=DCUVGI4dDhrDV3PjiJcUZDEIXkUB6ZtbJ6HUEjgKEdg"
          className="rounded"
        />
      </div>
    </div>
  );
};

export default CallToAction;
