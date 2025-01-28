import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const [spanDisplay, setSpanDisplay] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleMouseEnter = () => setSpanDisplay(true);
  const handleMouseLeave = () => setSpanDisplay(false);

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`fixed flex gap-2 bottom-5 right-5 bg-white text-black p-3 rounded-full shadow-lg`}
        >
          <span className={`${spanDisplay? '':"sr-only"}`}>Back to top</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
