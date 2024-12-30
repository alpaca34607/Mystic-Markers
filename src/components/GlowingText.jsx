import React from 'react';
// import "../../css/style.css";
import "../style.scss";

const GlowingText = ({ text }) => {
  // 確保 text 是字串，如果不是，則設為空字串
  const letters = typeof text === 'string' ? text.split('') : [];

  return (
    <div className="glowing-text">
      {letters.map((letter, index) => (
        <span key={index} style={{ animationDelay: `${index * 0.3}s` }}>
          {letter}
        </span>
      ))}
    </div>
  );
};

export default GlowingText;
