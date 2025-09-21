// TASK5 : Write a function to flatten a nested array/object.

import React from "react";

export const Task5 = () => {
  const nestedArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const nestedArray2 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, [8, 9]],
  ];

  const nestedObject = {
    a: 1,
    b: {
      b1: 2,
      b2: {
        b2a: 3,
        b2b: 4,
      },
    },
    c: 5,
  };

  let str = "";
  function flattenArrObj(input) {
    if (Array.isArray(input)) {
      // arr
      input.forEach((item, idx) => {
        if (Array.isArray(item) || typeof item === "object") {
          flattenArrObj(item);
        } else {
          str += item;
        }
      });
    } else if (typeof input === "object" && input != null) {
      // object
      console.log(Object.values(input));
      Object.values(input).forEach((item, idx) => {
        if (typeof item === "object" || Array.isArray(item)) {
          flattenArrObj(item);
        } else {
          str += item;
        }
      });
    } else {
      // a number
      str += input;
    }
  }

  flattenArrObj(nestedArray2);
  console.log("flatten Arr or obj", str);

  //   nestedArray.map((arr, idx) => {
  //     str += arr.join("");
  //     console.log(str);
  //   });

  return (
    <div>
      <h1>Flatten Nested Array</h1>
      <p>{str}</p>
    </div>
  );
};
