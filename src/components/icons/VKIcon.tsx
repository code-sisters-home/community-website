import React from 'react';

interface VKIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const VKIcon: React.FC<VKIconProps> = ({ 
  size = 24, 
  className = '', 
  ...props 
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M 4 2 C 2.898438 2 2 2.898438 2 4 L 2 20 C 2 21.101563 2.898438 22 4 22 L 20 22 C 21.101563 22 22 21.101563 22 20 L 22 4 C 22 2.898438 21.101563 2 20 2 Z M 8 6 L 11.875 6 C 13.074219 6 16 6.046875 16 8.53125 C 16 10.011719 14.992188 10.652344 14.53125 10.84375 L 14.53125 10.90625 C 15.71875 10.90625 17 12.15625 17 13.53125 C 17 15.011719 16.382813 17 12.40625 17 L 8 17 Z M 11 8 L 11 10 C 11 10 11.910156 10 12.0625 10 C 12.921875 10 13 9.242188 13 9.0625 C 13 8.949219 12.984375 8 12.03125 8 Z M 11 12 L 11 15 C 11 15 12.25 14.96875 12.5 14.96875 C 13.796875 14.96875 14 13.871094 14 13.46875 C 14 12.859375 13.65625 12 12.53125 12 C 12.261719 12 11 12 11 12 Z" />
  </svg>
);

export default VKIcon;