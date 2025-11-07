import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 60, height = 60, className = '' }) => {
  return (
    <img 
      src="/logo.svg" 
      alt="Assemble Logo"
      width={width}
      height={height}
      className={className}
      style={{ display: 'block', objectFit: 'contain' }}
    />
  );
};

export default Logo;
