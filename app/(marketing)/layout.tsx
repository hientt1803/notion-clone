import React from "react";
import NavBar from "./_components/NavBar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full dark:bg-[#1F1F1F]">
      <NavBar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
};

export default MarketingLayout;
