import React from "react";
import { UserHeader } from "@/components/header/UserHeader";
import { GridCard } from "@/components/grid/GridCard";
import { GridContainer } from "@/components/grid/GridContainer";
import { PageLayout } from "@/components/layout/PageLayout";

// Sample user data for demonstration
const demoUser = {
  id: 1,
  username: "alexj",
  password: "", // Password would never be sent to client in a real app
  name: "Alex Johnson",
  age: 34,
  netWorth: "$1,250,000",
  hasFamily: true,
  isOnline: true,
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
};

// Grid section will contain empty cards ready for external components

export default function HomePage() {
  return (
    <PageLayout>
      {/* Header */}
      <UserHeader user={demoUser} />
      
      {/* Grid Content - Empty containers ready for external components */}
      <GridContainer className="mt-4 md:mt-6 flex-grow h-full">
        {/* These empty GridCards can be replaced or populated with external components */}
        <GridCard color="bg-blue-50" className="h-full" />
        <GridCard color="bg-green-50" className="h-full" />
        <GridCard color="bg-purple-50" className="h-full" />
        <GridCard color="bg-amber-50" className="h-full" />
      </GridContainer>
    </PageLayout>
  );
}
