import React from "react";
import { Card } from "@/components/ui/card";

export interface GridCardProps {
  title?: string;
  value?: string;
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

export function GridCard({ title, value, color = "bg-blue-50", className, children }: GridCardProps) {
  return (
    <Card 
      className={`${color} shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between p-6 h-full ${className}`}
    >
      {children ? (
        children
      ) : (
        <>
          {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
          {value && (
            <div className="flex justify-end">
              <span className="text-2xl font-bold text-primary">{value}</span>
            </div>
          )}
        </>
      )}
    </Card>
  );
}