import React from "react";

const Projects = () => {
  return (
    <div className="bg-custom bg-custom-about">
      <div className="min-h-screen max-w-2xl mx-auto flex gap-4 flex-col justify-center items-center text-center ">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-md text-gray-700 dark:text-gray-400 ">
          Check out my other fun projects:
        </p>
        <a href="https://neflix-08.netlify.app/">Netflix</a>
        <a href="https://pizza-shop08.netlify.app/">Pizza Shop</a>
        <a href="https://mapty08.netlify.app/">Mapty</a>
        <a href="https://omnifoodonline.netlify.app/">Omnifood</a>
        <a href="https://dcpcr.netlify.app/">DCPCR</a>
        <a href="https://nftify-market.netlify.app/">NFTify market</a>
      </div>
    </div>
  );
};

export default Projects;
