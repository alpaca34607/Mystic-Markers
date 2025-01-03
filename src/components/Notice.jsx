import React from 'react';

const Notice = ({ isVisible, message }) => {
  if (!isVisible) return null;
  
  return (
    <div className="notice">
      <div className="notice-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        </div>
        <p>{message}</p>
    </div>
  );
};

export default Notice;