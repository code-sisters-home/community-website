import React from "react";

export const DotSeparator: React.FC<{ size?: number; className?: string }> = ({
  size = 4,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 4 4"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: "inline", margin: "0 0.3em", verticalAlign: "middle" }}
  >
    <circle cx="2" cy="2" r="1.7" />
  </svg>
);
