import React, { useEffect, useState } from 'react';
import "../style.scss";

const Cursor = ({ isAddingLocation = false }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia(
      "(max-width: 768px), (hover: none), (pointer: coarse)"
    );

    const updateEnabled = () => setEnabled(!mql.matches);
    updateEnabled();

    if (mql.addEventListener) {
      mql.addEventListener("change", updateEnabled);
    } else {
      // Safari 舊版相容
      mql.addListener(updateEnabled);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", updateEnabled);
      } else {
        mql.removeListener(updateEnabled);
      }
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.style.cursor = "default";
      return;
    }

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
  }, [isAddingLocation, enabled]); 

  if (!enabled) return null;

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