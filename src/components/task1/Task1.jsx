// TASK1 : Build a responsive portfolio page with flexbox/grid (mobile-first).

import React from "react";

const Task1 = () => {
  return (
    <div className="text-center mb-20">
      <h1 className="my-10 text-3xl font-bold">My Portfolio</h1>

      <div className="m-10">
        <h2 className="text-xl font-bold">About</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
          fugiat saepe mollitia voluptate iusto nulla est magni in commodi a
          laborum praesentium, accusamus omnis, quis veritatis dolore porro
          facere. Et.
        </p>
      </div>

      <h2 className="text-xl font-bold">Projects</h2>
      <div className="m-10 flex flex-col gap-10">
        <div className="flex gap-10">
          <div className="bg-black text-white h-20 w-full rounded-2xl">
            project
          </div>
          <div className="bg-black text-white h-20 w-full rounded-2xl">
            project
          </div>
        </div>
        <div className="flex gap-10">
          <div className="bg-black text-white h-20 w-full rounded-2xl">
            project
          </div>
          <div className="bg-black text-white h-20 w-full rounded-2xl">
            project
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task1;
