import React from "react";
import { TopNavbar } from "@Template/layout/TopNavbar";
import { Footer } from "@Template/layout/Footer";
import "./Layout.css";

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <TopNavbar />
      <main className="min-vh-100">{children}</main>
      <Footer />
    </React.Fragment>
  );
};
