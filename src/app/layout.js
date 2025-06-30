"use client";

import localFont from "next/font/local";
import "./globals.css";
import Menu from "@/components/menu";
import fetchData from "@/utils/fetchData";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname(); 
  const hideMenuRoutes = ["/login"];
  const token = getCookie("token");
  const [branch, setBranch] = useState([]);

  useEffect(() => {
    async function fetchBranches() {
      try {
        const data = await fetchData("http://localhost:3001/findAllBranch", token);
        setBranch(data);
      } catch (error) {
        console.error("Erro ao buscar branches:", error);
      }
    }
    if (!hideMenuRoutes.includes(pathname)) {
      fetchBranches();
    }
  }, [pathname]);

  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} 
      >
       <div className="flex">
           {!hideMenuRoutes.includes(pathname) && <Menu token={token} dataBranch={branch} />}
          {children}
       </div>
      </body>
    </html>
  );
}
