import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ width = 60, height = 60, className = '', onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/');
    }
  };

  return (
    <img 
      src="/logo.svg" 
      alt="Assemble Logo"
      width={width}
      height={height}
      className={className}
      onClick={handleClick}
      style={{ display: 'block', objectFit: 'contain', cursor: 'pointer' }}
    />
  );
};

export default Logo;
