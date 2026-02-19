import BottomBar from "@/components/bottom-bar";
import Navbar from "@/components/navbar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative z-0 flex min-h-screen w-full flex-col bg-background">
      {/* <Navbar /> */}
      {children}
      <BottomBar />
    </main>
  );
}

export default RootLayout;

// <SidebarProvider
//     style={
//       {
//         "--sidebar-width": "calc(var(--spacing) * 72)",
//         "--header-height": "calc(var(--spacing) * 12)",
//       } as React.CSSProperties
//     }
//   >
//     <AppSidebar  variant="inset" />
//     <SidebarInset>
//       <SiteHeader />
//       <div className="flex flex-1 flex-col">
//         {children}
//       </div>
//     </SidebarInset>
//   </SidebarProvider>
