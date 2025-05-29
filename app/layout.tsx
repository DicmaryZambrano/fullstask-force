import "../styles/globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import React from "react";
import { getCategories } from "../database/database";

export const metadata = {
  title: "Handcrafted Haven",
  description: "Marketplace for handmade treasures",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <body>
        <Header categories={categories} />
        {children}
        <Footer categories={categories} />
      </body>
    </html>
  );
}
