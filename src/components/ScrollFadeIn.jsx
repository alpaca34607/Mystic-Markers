import React, { useRef, useEffect, useState } from "react";


const ScrollFadeIn = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);


  return (
    <div
      ref={ref}
      className={`${className} ${
        isVisible ? "scroll-visible" : "scroll-hidden"
      }`}
    >
      {children}
    </div>
  );
};


export default ScrollFadeIn;

