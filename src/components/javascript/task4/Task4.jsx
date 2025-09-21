"use client";

// TASK4 : Rebuild a debounce & throttle utility.

import React, { useCallback, useMemo, useState } from "react";
import ThrottledScroll from "./Throttle";

function Debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

function throttle(func, wait) {
  let throttled = false;

  return function (...args) {
    if (!throttled) {
      func(...args);
      throttled = true;
      setTimeout(() => (throttled = false), wait);
    }
  };
}

export const Task4 = () => {
  const [input, SetInput] = useState("");
  const [firstUser, SetFirstUser] = useState("");
  const [selected, setSelected] = useState(false);

  function SearchFunction(query) {
    console.log(query);
  }

  async function SearchUserInDataBase(query) {
    const trimmedQuery = query.trim();
    if (trimmedQuery !== "") {
      const data = await fetch("https://dummyjson.com/users").then((res) => {
        console.log("PROMISE API CALL");

        return res.json();
      });

      const user = data["users"].filter((usr) =>
        `${usr.firstName} ${usr.lastName}`
          .toLowerCase()
          .includes(trimmedQuery.toLowerCase())
      );
      // console.log(data["users"]);
      // const { firstName, lastName } = user.length > 0 ? user[0] : user;
      // console.log(firstName, lastName);
      if (user.length > 0) {
        // console.log(`${user[0].firstName} ${user[0].lastName}`);
        SetFirstUser(`${user[0].firstName} ${user[0].lastName}`);
      } else {
        SetFirstUser("");
      }
    } else {
      SetFirstUser("");
      return;
    }
  }

  // const debouncedSearch = Debounce(SearchFunction, 300);
  // const debouncedSearch = useMemo(
  //   () => Debounce(SearchUserInDataBase, 1000),
  //   []
  // );

  // const debouncedSearch = useCallback(Debounce(SearchUserInDataBase, 1000), []);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold">debounce & throttle utility</h2>
      {/* <div>
        <label htmlFor="" className="mr-4">
          Search Debounce
        </label>
        <input
          type="text"
          onChange={(e) => debouncedSearch(e.target.value)}
          className="p-2 border rounded-xl"
        />
      </div> */}

      {/* <div className="relative">
        <label htmlFor="" className="mr-4">
          API Debounce
        </label>
        <input
          type="text"
          onChange={(e) => {
            SetInput(e.target.value);
            debouncedSearch(e.target.value);
          }}
          className="p-2 border rounded-xl"
          value={input}
        />
        {firstUser && (
          <div
            className={`absolute top-10 right-10 bg-gray-400 `}
            onClick={() => {
              SetFirstUser("");
              SetInput(firstUser);
            }}
          >
            {firstUser && firstUser}
          </div>
        )}
      </div> */}

      <div className="relative">
        <label htmlFor="" className="mr-4">
          Throttle
        </label>
        <input type="text" className="p-2 border rounded-xl" />
      </div>

      <ThrottledScroll />
    </div>
  );
};
