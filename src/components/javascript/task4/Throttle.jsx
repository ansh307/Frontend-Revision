import React, { useState, useEffect } from "react";

function throttle(func, wait) {
  let isThrottled = false;

  return function (...args) {
    if (!isThrottled) {
      func(...args);
      isThrottled = true;
      setTimeout(() => (isThrottled = false), wait);
    }
  };
}

function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

const ThrottledScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  const throttledScrollHandler = throttle(handleScroll, 200);

  useEffect(() => {
    window.addEventListener("scroll", throttledScrollHandler);

    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
    };
  }, []);

  return (
    <div className="relative">
      <h1 className="z-10 absolute top-1/2">
        Scroll Position: {scrollPosition}
      </h1>

      <div style={{ height: "2000px", background: "#f0f0f0" }}></div>
    </div>
  );
};

export default ThrottledScroll;
