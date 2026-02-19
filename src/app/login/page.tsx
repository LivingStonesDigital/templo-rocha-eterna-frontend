import { caller, HydrateClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import LoginForm from "./login-form";

function page() {
  return (
    <HydrateClient>
      <main className="min-h-screen ">
        <LoginForm />
      </main>
    </HydrateClient>
  );
}

export default page;
