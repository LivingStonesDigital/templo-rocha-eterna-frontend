"use client";
import { TRPCReactProvider } from "@/trpc/client";
import React from "react";
import { Toaster } from "sonner";
import { UserProvider } from "./user-provider";
import PageTransition from "@/components/page-transition";

function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TRPCReactProvider>
        <PageTransition>
          <UserProvider>
            <Toaster position="top-center" richColors />
            {children}
          </UserProvider>
        </PageTransition>
      </TRPCReactProvider>
    </>
  );
}

export default ClientProvider;
