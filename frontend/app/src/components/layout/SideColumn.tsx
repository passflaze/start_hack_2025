import React, { useState, useEffect, useRef } from "react";

type Position = "left" | "right";

interface SideColumnProps {
  position: Position;
  children?: React.ReactNode;
  className?: string;
}

export function SideColumn({ position, children, className }: SideColumnProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [gridTop, setGridTop] = useState(0);
  const [gridHeight, setGridHeight] = useState(0);
  const columnRef = useRef<HTMLDivElement>(null);

  // Update the grid position and dimensions
  const updateGridDimensions = () => {
    // Find the grid container to align with
    const gridContainer = document.querySelector(".grid-container");
    const mainContent = document.querySelector("main");

    if (gridContainer && mainContent) {
      const gridRect = gridContainer.getBoundingClientRect();
      const mainRect = mainContent.getBoundingClientRect();

      // Get position from top of grid
      setGridTop(gridRect.top);

      // Set height to fill from grid top to bottom of main content
      setGridHeight(mainRect.bottom - gridRect.top);
    }
  };

  // Set the trigger area based on position
  const handleMouseMove = (e: MouseEvent) => {
    const triggerThreshold = 50; // pixels from edge
    const windowWidth = window.innerWidth;

    if (position === "left" && e.clientX < triggerThreshold) {
      setIsVisible(true);
    } else if (
      position === "right" &&
      e.clientX > windowWidth - triggerThreshold
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    // Initial position calculation
    updateGridDimensions();

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", updateGridDimensions);
    window.addEventListener("load", updateGridDimensions);

    // Update dimensions when content may have changed
    const observer = new MutationObserver(updateGridDimensions);
    const body = document.body;
    observer.observe(body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateGridDimensions);
      window.removeEventListener("load", updateGridDimensions);
      observer.disconnect();
    };
  }, []);

  // Position styling
  const positionClass =
    position === "left"
      ? "left-0"
      : "right-0";

  // Transition styling for appearing/disappearing
  const visibilityClass = isVisible
    ? "translate-x-0 opacity-100"
    : position === "left"
      ? "-translate-x-full opacity-0"
      : "translate-x-full opacity-0";

  return (
    <div
      ref={columnRef}
      style={{
        top: `${gridTop}px`,
        height: `${gridHeight}px`,
      }}
      className={`
        fixed w-64 bg-white/90 backdrop-blur-sm
          shadow-[0_0_15px_rgba(0,0,0,0.25)] z-20
        transition-all duration-300 ease-in-out
        ${positionClass} ${visibilityClass} ${className}
      `}
    >
      <div className="p-4 h-full">
        {/* This is an empty column that will appear when mouse moves to this side */}
        {children}
      </div>
    </div>
  );
}
