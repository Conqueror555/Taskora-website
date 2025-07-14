import React from 'react';

function IconStopwatch({ strokeColor = "black" }: { strokeColor?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11 2V4M7.22 5.22L5.8 3.8M15 4L17 2M11 6A6 6 0 1011 18A6 6 0 0011 6ZM11 10V13"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default IconStopwatch;
