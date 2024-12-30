import React, { useState, useEffect } from "react";
import "../style.scss";


export default function GotoTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false); // 判斷是否接近footer


  // 監聽滾動
  useEffect(() => {
    const handleScroll = () => {
      // 滾動超過300px才顯示
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }


      // 計算footer的top位置
      const footer = document.querySelector("footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // 當footer快接近視窗底部時停止按鈕的滾動
        if (footerTop < windowHeight-160) {
          setIsNearFooter(true);
        } else {
          setIsNearFooter(false);
        }
      }
    };


    window.addEventListener("scroll", handleScroll);


    return () => {
      window.removeEventListener("scroll", handleScroll); // 清除事件監聽
    };
  }, []);


  // 滾動到頂部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 平滑滾動
    });
  };


  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="totop"
          style={{
            bottom: isNearFooter ? "300px" : "20px", // 根據是否接近footer調整位置
          }}
        >
        </button>
      )}
    </>
  );
}

