'use client'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {CartContext} from "@/app/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body className="layout">
           <CartContext>
               <header>
                   <Navbar />
               </header>
               <main className="main-container">
                   {children}
               </main>
               <footer>
                   <Footer />
               </footer>
           </CartContext>
       </body>
    </html>
  );
}
