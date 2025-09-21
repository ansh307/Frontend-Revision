"use client";

import { useParams } from "next/navigation";
import React from "react";
import { posts } from "@/lib/posts";

const Post = () => {
  const params = useParams();
  const post = posts.filter((post) => post.id === params.id)[0];
  console.log(post.id);
  if (!post) {
    return <p className="text-center text-lg text-gray-500">Post not found!</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6  flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        {post.title}
      </h1>
      <div className="flex justify-between text-sm text-gray-500 mb-6">
        <span className="font-medium">{post.author}</span>
      </div>
      <div className="text-lg text-gray-700 leading-relaxed space-y-4">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
