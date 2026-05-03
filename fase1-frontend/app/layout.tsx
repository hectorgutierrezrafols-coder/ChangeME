import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "./components/SideBar";

import "./globals.css";

export const metadata: Metadata = {
  title: "ChangeME",
  description: "App de productividad con IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <ClerkProvider>
    <html lang="es">
      <body>
        <Sidebar />
        <div style={{ marginLeft: 240 }}>
          {children}
        </div>
      </body>
    </html>
  </ClerkProvider>
);
}