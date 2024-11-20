import React from "react";
import { useTheme } from "next-themes";
import data from "../../data/portfolio.json";

const Button = ({ children, type, onClick, classes, icon: Icon }) => {
  const { theme } = useTheme();

  // Check if children is a valid non-empty string
  const hasText = React.Children.toArray(children).some(
    (child) => typeof child === "string" && child.trim() !== ""
  );

  // Return null if no valid text is provided
  if (!hasText) {
    return null;
  }

  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevents any default behavior on mobile
    if (onClick) {
      onClick();
    }
  };

  const baseClasses = "text-sm tablet:text-base p-2 m-1 rounded-lg transition-all duration-300 ease-out";
  const scaleEffect = type !== "green" ? "hover:scale-105 active:scale-95" : ""; // Disable hover effects for green button
  const cursorStyle = typeof window !== "undefined" && "ontouchstart" in window
    ? "" // Avoid cursor-none on mobile
    : data.showCursor ? "cursor-none" : "cursor-pointer";

  // Theme-based styles for primary, secondary, and green buttons
  const primaryStyle = theme === "dark" ? "bg-white text-black" : "bg-black text-white";
  const secondaryStyle = theme === "dark" ? "hover:bg-slate-600 text-white" : "hover:bg-slate-100 text-black";
  const greenStyle = "bg-[#E2EFE2] text-[#56744E]"; // No hover effect for green button

  return (
    <button
      onClick={type === "green" ? undefined : handleButtonClick} // Disable onClick for green button
      onTouchStart={type === "green" ? undefined : handleButtonClick} // Disable touch for green button
      type="button"
      className={`${baseClasses} ${
        type === "primary"
          ? primaryStyle
          : type === "green"
          ? greenStyle
          : secondaryStyle
      } ${scaleEffect} ${cursorStyle} ${classes}`}
      style={{
        position: "relative", // Ensures it’s positioned above other elements
        zIndex: 10, // Higher z-index for top-layer interaction
      }}
    >
      {/* Add Icon if provided */}
      {Icon && <Icon className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;
