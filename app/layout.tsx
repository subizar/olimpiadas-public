import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carrito de compra",
  description: "Aplicación con login, base de datos y CRUD",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
    <body className={inter.className}>
      <div className="flex">
        <Sidebar />
        <main className="flex-grow ml-64 p-0">
          {children}
        </main>
      </div>
    </body>
  </html>
  );
}
