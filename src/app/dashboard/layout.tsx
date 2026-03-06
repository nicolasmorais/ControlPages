import { Sidebar } from "@/components/dashboard/Sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-sans">
      <Sidebar />
      <div className="flex flex-col sm:pl-72">
        {/* Removendo o cabeçalho vazio que causava o espaço em branco */}
        {/* <header className="sticky top-0 z-10 flex h-16 items-center justify-end gap-4 border-b bg-background px-4 sm:px-6"></header> */}
        <main className="flex-1 items-start min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}