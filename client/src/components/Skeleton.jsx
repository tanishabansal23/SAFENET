import React from "react";
import "./Skeleton.css";

const Skeleton = ({ width, height, borderRadius = "8px", className = "" }) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width: width || "100%",
        height: height || "20px",
        borderRadius,
      }}
    ></div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <Skeleton height="60px" width="60px" borderRadius="50%" />
      <Skeleton height="24px" width="70%" />
      <Skeleton height="16px" width="90%" />
      <Skeleton height="16px" width="80%" />
      <Skeleton height="40px" width="50%" borderRadius="8px" />
    </div>
  );
};

export default Skeleton;
