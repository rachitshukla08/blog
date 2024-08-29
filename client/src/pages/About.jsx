import React from "react";

const About = () => {
  return (
    <div className="bg-custom bg-custom-about">
      <div className="min-h-screen flex items-center my-0 sm:-my-8">
        <div className="max-w-2xl mx-auto p-10 sm:p-3">
          <div className="text-md text-gray-700 dark:text-gray-400 flex flex-col gap-8 text-center divide-y-2 divide-gray-300 dark:divide-cyan-800 ">
            <h1 className="text-3xl font-bold">About Me :)</h1>
            <p className="pt-4">
              Hi, I'm Rachit! I'm passionate about software development and
              constantly exploring the vast world of software engineering. I
              have worked with DSA LLD React Javascript VueJS and much more. I
              also have a keen interest in writing blogs thats why I created
              this app. Do check out my Leetcode Github and other Projects as
              well from the Projects section.
            </p>
            <p className="pt-4">
              This blog is my way of sharing the knowledge and insights I've
              gained along the way, with the hope of inspiring and helping
              others in their own development journeys. Whether you're a fellow
              developer, a tech enthusiast, or someone just getting started, I’m
              excited to have you here!
            </p>
            <p className="pt-4">
              Beyond the code, I enjoy engaging with the developer community,
              solving complex problems, and exploring new ideas. I strive to
              make technology more accessible and understandable for everyone.
              Join me on this journey, where we can learn, innovate, and build
              amazing things together!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
