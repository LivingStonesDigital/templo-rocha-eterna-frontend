"use client";
import { TRPCReactProvider } from "@/trpc/client";
import React from "react";
import { Toaster } from "sonner";
import { UserProvider } from "./user-provider";

function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TRPCReactProvider>
        <UserProvider>
          <Toaster position="top-center" richColors />
          {children}
        </UserProvider>
      </TRPCReactProvider>
    </>
  );
}

export default ClientProvider;
