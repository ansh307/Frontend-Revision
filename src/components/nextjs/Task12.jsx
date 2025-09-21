"use client";

// useMemo

import React, { useMemo, useState } from "react";
import { posts } from "@/lib/posts";

export default function Task12() {
  const [searchTerm, setSearchTerm] = useState("");

  // 🔁 This computation only re-runs when searchTerm changes
  const filteredPosts = useMemo(() => {
    console.log("Filtering posts...");
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Search posts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded px-3 py-2 w-full mb-4"
      />
      <ul className="space-y-3">
        {filteredPosts.map((post) => (
          <li key={post.id} className="bg-gray-200 p-4 rounded">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
