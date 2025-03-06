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

  const baseClasses = " rounded-lg transition-all duration-300 ease-out";
  const scaleEffect = type !== "green" ? "hover:scale-110 active:scale-90 cat" : ""; // Disable hover effects for green button
  const cursorStyle = typeof window !== "undefined" && "ontouchstart" in window
    ? "" // Avoid cursor-none on mobile
    : data.showCursor ? "cursor-none" : "cursor-pointer";

  // Theme-based styles for primary, secondary, green, and blue buttons
  const primaryStyle = theme === "dark" ? "text-sm tablet:text-base p-2 m-1 bg-white text-black" : "text-sm tablet:text-base p-2 m-1 bg-black text-white";
  const secondaryStyle = theme === "dark" ? "text-sm tablet:text-base p-2 m-1 hover:bg-slate-600 text-white" : "text-sm tablet:text-base p-2 m-1 hover:bg-slate-100 text-black";
  const greenStyle = "text-sm tablet:text-base p-2 m-1 bg-[#E2EFE2] text-[#56744E] cat"; // No hover effect for green button
  const bigStyle = theme === "dark" 
    ? "text-xl justify-center mx-auto py-4 px-8 m-2 bg-[#E2EFE2] hover:bg-[#d0e8d0] text-[#56744E] shadow-lg cat" 
    : "text-xl justify-center mx-auto py-4 px-8 m-2 bg-[#E2EFE2] hover:bg-[#d0e8d0] text-[#56744E] shadow-lg cat";

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
          : type === "big"
          ? bigStyle
          : secondaryStyle
      } ${scaleEffect} ${cursorStyle} ${classes}`}
      style={{
        position: "relative", // Ensures it's positioned above other elements
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
