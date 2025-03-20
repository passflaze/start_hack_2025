import React from "react";

export interface GridContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function GridContainer({ children, className }: GridContainerProps) {
  return (
    <div className={`grid-container grid grid-cols-1 md:grid-cols-2 gap-3 h-[70vh] overflow-hidden ${className}`}>
      {children}
    </div>
  );
}