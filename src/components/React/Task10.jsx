"use client";

// api call debounce search

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// function RandomIndex(length) {
//   return Math.floor(Math.random() * length) + 1;
// }

const API_URL = "https://dummyjson.com/users";

import React, { useMemo, useState } from "react";

export const Task10 = () => {
  const [searchInput, setSearchInput] = useState("");
  const [dbusers, setDbusers] = useState([]);

  async function handleSearch(query) {
    if (query === "") {
      return;
    }
    const data = await fetch(API_URL).then((res) => res.json());
    // const randomUser = data["users"][RandomIndex(data["users"].length)]
    if (data["users"].length > 0) {
      setDbusers(
        data["users"].filter((usr) =>
          `${usr.firstName} ${usr.lastName}`
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      );
    }
  }

  // ✅ useMemo to persist debounced function
  const DebounceHandleSearch = useMemo(() => {
    return debounce(handleSearch, 300);
  }, []);

  return (
    <div className="flex flex-col mt-48 items-center h-screen">
      <h2 className="text-xl font-bold">Find Names</h2>
      <div>
        <input
          type="text"
          name=""
          id="searchInput"
          className="p-2 border rounded-xl"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            if (e.target.value !== "") {
              DebounceHandleSearch(e.target.value);
            } else {
              setDbusers([]);
            }
          }}
        />
      </div>

      <ul className="flex flex-col gap-2 mt-4">
        {dbusers.map((user) => {
          return (
            <li
              className="flex items-center justify-between bg-gray-200 w-48 p-2 rounded-lg "
              key={user.id}
              onClick={() => {
                setSearchInput(`${user.firstName} ${user.lastName}`);
                setDbusers([]);
              }}
            >
              <p>{user.firstName}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
