import React from "react";
import { SideColumn } from "./SideColumn";

export interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={`min-h-screen h-screen flex flex-col bg-background ${className}`}>
      {/* Left Side Column - appears when mouse moves to left edge */}
      <SideColumn position="left" />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-7xl flex-1 flex flex-col">
        {children}
      </main>
      
      {/* Right Side Column - appears when mouse moves to right edge */}
      <SideColumn position="right" />
    </div>
  );
}