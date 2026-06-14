import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="w-10 h-10 bg-compass-bg-primary flex items-center justify-center p-2 shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className="w-full h-full"
        >
          <path d="M12 2L12 22M2 12H22M4.93 4.93L19.07 19.07M19.07 4.93L4.93 19.07" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold uppercase tracking-tighter text-compass-heading-secondary leading-none">
          Compass
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-compass-bg-primary leading-none mt-1 opacity-60">
          Management
        </span>
      </div>
    </div>
  );
};

export default Logo;
