import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

function Membros() {
  return (
    <>
      <div className="px-6 sticky w-full h-40 top-0 z-10  gap-y-4 flex flex-col justify-around  bg-white">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-xl">Membros</h1>
            <span>8 de 8 membros</span>
          </div>
          <div>
            <Button>Novo</Button>
          </div>
        </div>

        <div>
          <Input />
        </div>
      </div>

      <section className="@container/main z-0 relative flex flex-1 flex-col gap-2 px-6">
        <div className="z-0 flex  flex-col gap-4 pb-12">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card
              key={index}
              className={cn("", index === 0 && "border border-primary")}
            >
              <CardHeader className="flex flex-col">
                <div className="flex gap-x-4 items-center">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>John Doe</CardTitle>
                    <CardDescription>Admin</CardDescription>
                  </div>
                </div>
                <div
                  className={cn(
                    "w-full h-0.5 bg-muted-foreground",
                    index === 0 && "bg-black",
                  )}
                ></div>
              </CardHeader>
              <CardContent>
                <p>18 de Março</p>
                <p>+55 11 99999-9999</p>
                <p>lV3o5@example.com</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

export default Membros;
