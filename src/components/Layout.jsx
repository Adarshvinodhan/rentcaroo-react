import React from "react";
import NavSidebar from "./NavSidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <NavSidebar />
      <div className="flex flex-col w-full">
        <main className="flex-grow p-4 bg-gray-50 sm:mt-0 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
