"use client";

import React from "react";
import { posts } from "@/lib/posts";
import { useRouter } from "next/navigation";
const Posts = () => {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center mt-52 max-w-xl mx-auto ">
      <h2 className="text-xl font-bold p-4">Posts</h2>
      <ul className="flex flex-col gap-3 w-full">
        {posts &&
          posts.map((post) => {
            return (
              <li
                key={post.id}
                className="bg-gray-300 rounded-lg p-4 flex items-center justify-between"
                onClick={() => router.push(`/posts/${post.id}`)}
              >
                <div className="flex gap-2">
                  <span>{post.id}</span>
                  <p>{post.title}</p>
                </div>
                <span className="font-medium">{post.author}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Posts;
