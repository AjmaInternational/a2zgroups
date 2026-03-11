import React from 'react';

const WaveDivider = ({
  waveColor = "#159a9c",
  className = "",
  flip = false
}) => {
  return (
    <div className={`relative w-full overflow-hidden leading-none -mb-1 ${className}`}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        style={{ transform: flip ? "scaleY(-1)" : "none" }}
        className="block w-full h-[80px] md:h-[120px]"
        
      >
        <path
          fill={waveColor}
          d="M0,60C240,120 480,0 720,60C960,120 1200,0 1440,60L1440,120L0,120Z"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;