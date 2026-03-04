import React from 'react';

const WaveDivider = ({ color = "#159a9c", className = "" }) => {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        className="w-full h-[120px] md:h-[160px]"
        preserveAspectRatio="none"
      >
        <path
          fill={color}
          d="M0,64L80,74.7C160,85,320,107,480,101.3C640,96,800,64,960,53.3C1120,43,1280,53,1360,58.7L1440,64V120H0Z"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
