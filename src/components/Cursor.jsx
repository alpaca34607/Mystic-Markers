import React, { useEffect, useState } from 'react';
import "../style.scss";

const Cursor = ({ isAddingLocation }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // 根據 isAddingLocation 狀態控制原始游標的顯示
    if (isAddingLocation) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'default';
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      if (!isAddingLocation) {
        setHovering(true);
      }
    };

    const handleMouseLeave = () => {
      if (!isAddingLocation) {
        setHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    const hoverdElements = document.querySelectorAll('a, button');
    hoverdElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      hoverdElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      // 清理時恢復原始游標
      document.body.style.cursor = 'default';
    };
  }, [isAddingLocation]); 

  return (
    <div
      id="custom-cursor"
      className={`cursor ${hovering ? 'hovered' : ''} ${isAddingLocation ? 'adding-location' : ''}`}
      style={{ 
        left: `${position.x + (isAddingLocation ? -20 : 0)}px`,
        top: `${position.y + (isAddingLocation ? -20 : 0)}px`,
      }}
    ></div>
  );
};

export default Cursor;