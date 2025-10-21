import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 60, height = 60, className = '' }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 360 360" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      {/* Triangle structure lines */}
      <line 
        x1="135.75" 
        y1="239.38" 
        x2="180" 
        y2="97" 
        stroke="#10B981" 
        strokeWidth="3" 
        strokeMiterlimit="10"
      />
      <line 
        x1="230.39" 
        y1="241" 
        x2="180" 
        y2="97" 
        stroke="#10B981" 
        strokeWidth="3" 
        strokeMiterlimit="10"
      />
      
      {/* Curved paths */}
      <path 
        d="M229.43,238.61c105.12-56.43-137.02-107.62-124.77-69.35" 
        fill="none" 
        stroke="#10B981" 
        strokeWidth="5" 
        strokeMiterlimit="10"
      />
      <path 
        d="M105.06,163.76c-12.26,21.12,65.77,17.45,130.44-12.26" 
        fill="none" 
        stroke="#10B981" 
        strokeWidth="6" 
        strokeMiterlimit="10"
      />
      
      {/* Arrow line and head */}
      <line 
        x1="198.67" 
        y1="168.7" 
        x2="236.04" 
        y2="151.18" 
        stroke="#10B981" 
        strokeWidth="3" 
        strokeMiterlimit="10"
      />
      <path 
        d="M234.41,151.94l-3.51-2.33.08-.13,6.31-.38c2.04-.46,4.09-.92,6.13-1.38-1.66,1.28-3.32,2.55-4.99,3.83l-4.33,4.61h-.14s.45-4.21.45-4.21Z" 
        fill="#10B981"
      />
      
      {/* Rectangular elements */}
      <rect 
        x="146.98" 
        y="208.2" 
        width="67.86" 
        height="15.58" 
        fill="none" 
        stroke="#10B981" 
        strokeWidth="2" 
        strokeMiterlimit="10"
      />
      <rect 
        x="167.34" 
        y="224.03" 
        width="67.86" 
        height="13.93" 
        fill="none" 
        stroke="#10B981" 
        strokeWidth="2" 
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export default Logo;