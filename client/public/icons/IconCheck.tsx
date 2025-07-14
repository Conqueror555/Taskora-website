import React from 'react';

function IconCheck({ strokeColor = "black" }: { strokeColor?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Clock Circle */}
      <circle cx="12" cy="12" r="10" stroke={strokeColor} strokeWidth="2" />

      {/* Clock Hands */}
      <path
        d="M12 6v6l4 2"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      
    </svg>
  );
}

export default IconCheck;
