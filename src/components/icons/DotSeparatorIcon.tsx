import React from "react";

interface DotSeparatorProps {
  size?: number;
  className?: string;
}

export const DotSeparatorIcon: React.FC<DotSeparatorProps> = ({
  size = 4,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 4 4"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block mx-1.5 align-middle ${className}`}
    role="separator"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="2" cy="2" r="1.7" />
  </svg>
);

export default DotSeparatorIcon;