import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type UserAvatarProps = {
  avatar?: string | null;
  name: string;
  isOnline?: boolean;
  className?: string;
};

export function UserAvatar({ avatar, name, isOnline = false, className }: UserAvatarProps) {
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className={`relative ${className}`}>
      <Avatar className="h-12 w-12 md:h-16 md:w-16 bg-primary">
        {avatar ? (
          <AvatarImage src={avatar} alt={name} />
        ) : (
          <AvatarFallback className="text-white text-xl font-semibold">
            {getInitials(name)}
          </AvatarFallback>
        )}
      </Avatar>
      
      {/* Online status indicator */}
      {isOnline && (
        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-white"></div>
      )}
    </div>
  );
}
