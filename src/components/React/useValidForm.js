"use client";

import { useEffect, useState } from "react";

const useValidForm = (formData) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    const { name, email, phone, password } = formData || {};
    const newErrors = {};

    // Name validation
    if (touched.name) {
      if (!name || name.trim() === "") {
        newErrors.name = "Name is required";
      }
    }

    if (touched.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || email.trim() === "") {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (touched.phone) {
      const phoneRegex = /^[0-9\-\+\s]{10,}$/;
      if (!phone || phone.trim() === "") {
        newErrors.phone = "Phone number is required";
      } else if (!phoneRegex.test(phone)) {
        newErrors.phone = "Invalid phone number";
      }
    }

    // Password validation

    if (touched.password) {
      const passwordRules = {
        length: /.{8,}/,
        upper: /[A-Z]/,
        lower: /[a-z]/,
        number: /[0-9]/,
        special: /[!@#\$%\^\&*\)\(+=._-]/,
      };

      if (!password || password.trim() === "") {
        newErrors.password = "Password is required";
      } else {
        if (!passwordRules.length.test(password)) {
          newErrors.password = "Password must be at least 8 characters";
        } else if (!passwordRules.upper.test(password)) {
          newErrors.password = "Password must include an uppercase letter";
        } else if (!passwordRules.lower.test(password)) {
          newErrors.password = "Password must include a lowercase letter";
        } else if (!passwordRules.number.test(password)) {
          newErrors.password = "Password must include a number";
        } else if (!passwordRules.special.test(password)) {
          newErrors.password = "Password must include a special character";
        }
      }
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [formData, touched]);

  return { errors, isValid, markTouched };
};

export default useValidForm;
