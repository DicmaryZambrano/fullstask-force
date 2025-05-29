import "../styles/globals.css";
import Footer from "../components/Footer";
import React from "react";

export const metadata = {
  title: "Handcrafted Haven",
  description: "Marketplace for handmade treasures",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
