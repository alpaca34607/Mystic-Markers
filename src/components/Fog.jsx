import React from "react";
import "../../css/Fog.css";


const generateRandomFog = (count) => {
  const fogElements = [];
  for (let i = 0; i < count; i++) {
    const randomX = Math.random() * 200;
    const randomY = Math.random() * 100;// 垂直方向隨機
    const randomOpacity = Math.random() * 0.5 + 0.3;
    const randomDuration = Math.random() * 90 + 90; // 120-240秒的動畫
    const randomSize = Math.random() * 100 + 250; // 100px-250px 粒子大小


    fogElements.push(
      <div
        key={i}
        className="fog"
        style={{
          top: `${randomY}%`,
          left: `${randomX}%`,
          opacity: randomOpacity,
          animationDuration: `${randomDuration}s`,
          width: `${randomSize}px`,
          height: `${randomSize}px`,
        }}
      ></div>
    );
  }
  return fogElements;
};


const Fog = ({ className }) => {
  return (
    <div className={`fog-container ${className}`}>
      {generateRandomFog(40)} {/* 調整粒子數量 */}
    </div>
  );
};


export default Fog;

