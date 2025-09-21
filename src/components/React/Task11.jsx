"use client";

// Create a custom React hook for form validation.

import React, { useEffect, useState } from "react";
import useValidForm from "./useValidForm";

export const Task11 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { errors, isValid, markTouched } = useValidForm(formData);

  const handleBlur = (e) => {
    const field = e.target.name;
    markTouched(field);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function HandleLogin(e) {
    e.preventDefault();
    if (isValid) {
      alert("Form submitted successfully!");
      console.log(formData);
    } else {
      alert("Fix errors before submitting.");
    }
  }

  return (
    <form
      className="flex flex-col items-center justify-center h-screen max-w-xl mx-auto"
      onSubmit={HandleLogin}
    >
      <h2 className="text-xl font-bold my-4">login</h2>
      <div className="flex flex-col gap-2 w-xl">
        <div className="flex gap-2 items-center ">
          <label className="font-bold" htmlFor="Name">
            Name
          </label>
          <input
            type="text"
            id="Name"
            name="name"
            className="p-2 border w-full rounded-xl"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

        <div className="flex gap-2 items-center ">
          <label className="font-bold" htmlFor="Email">
            Email
          </label>
          <input
            type="email"
            id="Email"
            name="email"
            className="p-2 border w-full rounded-xl"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

        <div className="flex gap-2 items-center ">
          <label className="font-bold" htmlFor="Phone">
            Phone
          </label>
          <input
            type="number"
            id="Phone"
            name="phone"
            className="p-2 border w-full rounded-xl"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

        <div className="flex gap-2 items-center ">
          <label className="font-bold" htmlFor="Password">
            Password
          </label>
          <input
            type="password"
            id="Password"
            name="password"
            className="p-2 border w-full rounded-xl"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}
      </div>
      <button className="p-2 w-full bg-blue-500 rounded-xl my-4" type="submit">
        Login
      </button>
    </form>
  );
};
