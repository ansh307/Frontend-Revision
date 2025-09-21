// TASK3 : Create a modal, tooltip, and dropdown menu only with HTML + CSS.

"use client";

import React, { useState } from "react";

const Task3 = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [toolTipOpen, setToolTipOpen] = useState(false);
  const [dropDownMenuOpen, setDropDownMenuOpen] = useState(false);
  return (
    <div className="text-center flex flex-col justify-center items-center h-screen relative">
      <h1 className="text-xl font-bold">MODAL, ToolTip and DropDown Menu</h1>

      {/* modal */}
      <div className="flex flex-col my-8">
        <div className="flex gap-10 items-center justify-center">
          <h2>Modal</h2>
          <button
            className="bg-gray-300 p-2 rounded-lg"
            onClick={() => setModalOpen((prev) => !prev)}
          >
            open Model
          </button>
        </div>
        <div
          className={`bg-black text-white ${
            modalOpen ? "block" : "hidden"
          } z-50 absolute inset-0  `}
        >
          <button
            className="bg-gray-300 p-2 rounded-lg"
            onClick={() => setModalOpen((prev) => !prev)}
          >
            Close Modal Button
          </button>
          This is inside content of modal
        </div>
      </div>

      {/* Tooltip */}
      <div className="flex flex-col my-8 relative">
        <div className="flex gap-10 items-center justify-center">
          <h2>ToolTip</h2>
          <button
            className="bg-gray-300 p-2 rounded-lg"
            onMouseEnter={() => setToolTipOpen(true)}
            onMouseLeave={() => setToolTipOpen(false)}
          >
            open Tooltip
          </button>
        </div>
        <div
          className={`bg-black text-white ${
            toolTipOpen ? "block" : "hidden"
          }  z-50 absolute top-10 `}
        >
          This is inside content of Tooltip
        </div>
      </div>

      {/* Drop Down Menu */}
      <div className="flex flex-col my-8 relative">
        <div className="flex gap-10 items-center justify-center">
          <h2>Drop Down Menu</h2>
          <button
            className="bg-gray-300 p-2 rounded-lg"
            onClick={() => setDropDownMenuOpen((prev) => !prev)}
          >
            open DropDown Menu
          </button>
        </div>
        <div
          className={`bg-black text-white ${
            dropDownMenuOpen ? "block" : "hidden"
          }  z-20 absolute top-10 w-full`}
        >
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Task3;
