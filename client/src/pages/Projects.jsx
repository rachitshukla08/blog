import React from "react";

const Projects = () => {
  return (
    <div className="bg-custom bg-custom-about">
      <div className="min-h-screen max-w-2xl mx-auto flex gap-4 flex-col justify-center items-center text-center ">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-md text-gray-700 dark:text-gray-400 ">
          Check out my other fun projects:
        </p>
        <a
          href="https://neflix-08.netlify.app/"
          className="hover:text-cyan-600 dark:hover:text-cyan-500"
          target="_blank"
        >
          Netflix
        </a>
        <a
          href="https://pizza-shop08.netlify.app/"
          className="hover:text-cyan-600 dark:hover:text-cyan-500"
          target="_blank"
        >
          Pizza Shop
        </a>
        <a
          href="https://mapty08.netlify.app/"
          className="hover:text-cyan-600 dark:hover:text-cyan-500"
          target="_blank"
        >
          Mapty
        </a>
        <a
          href="https://omnifoodonline.netlify.app/"
          className="hover:text-cyan-600 dark:hover:text-cyan-500"
          target="_blank"
        >
          Omnifood
        </a>
        <a
          href="https://dcpcr.netlify.app/"
          className="hover:text-cyan-600 dark:hover:text-cyan-500"
          target="_blank"
        >
          DCPCR
        </a>
        <a
          href="https://nftify-market.netlify.app/"
          className="hover:text-cyan-600 dark:hover:text-cyan-500"
          target="_blank"
        >
          NFTify market
        </a>
        <a
          href="https://flappy-game08.netlify.app/"
          className="hover:text-cyan-600 dark:hover:text-cyan-500"
          target="_blank"
        >
          Flappy Game
        </a>
      </div>
    </div>
  );
};

export default Projects;
