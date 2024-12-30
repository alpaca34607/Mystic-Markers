import React from "react";


const FogMask = ({ children }) => {
  return (
    <div className="masked-content">
      <svg width="0" height="0">
        <defs>
          <mask id="blur-mask" maskUnits="objectBoundingBox" x="0" y="0" width="1" height="1">
            <radialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" style={{ stopColor: "white", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "white", stopOpacity: 0 }} />
            </radialGradient>
            <rect x="0" y="0" width="1" height="1" fill="url(#gradient)" />
          </mask>
        </defs>
      </svg>


      <div className="fog-area">{children}</div>
    </div>
  );
};


export default FogMask;

