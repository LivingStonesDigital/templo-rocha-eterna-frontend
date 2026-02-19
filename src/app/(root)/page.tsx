"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import {
  IconCirclePlus,
  IconUser
} from "@tabler/icons-react";

export default function Home() {
  const trpc = useTRPC();

  return (
    <section className="z-0 @container/main flex flex-1 flex-col gap-2 px-6">
      <nav className="flex items-center justify-between py-2">
        <div className="space-y-2">
          <h1 className="text-xl font-bold">Seja bem-vindo(a)</h1>
          <p className="text-lg font-semibold">Templo Rocha Eterna</p>
        </div>
      </nav>

      <aside className="bg-linear-to-bl from-10% from-violet-300 to-100% to-blue-300 w-full h-44 rounded-xl"></aside>

      <div className="flex justify-between gap-x-4">
        <div className="w-1/2 h-28 bg-linear-to-bl from-10% from-violet-300 to-100% to-blue-300 rounded-xl">
          <div className="flex flex-col items-center justify-center">
            <div>
              <IconUser className="size-8" />
              <span>22</span>
            </div>
            Total de Membros
          </div>
        </div>
        <div className="w-1/2 h-28 bg-linear-to-bl from-10% from-violet-300 to-100% to-blue-300 rounded-xl">
          Total de Aniversariantes
          <span>22</span>
        </div>
      </div>

      <div className="flex flex-col py-2">
        <span className="text-2xl font-bold">Ações rapidas</span>
        <div>
          <Button className="h-20 w-20 flex flex-col items-center justify-center gap-0 rounded-xl bg-linear-to-bl from-10% from-violet-300 to-100% to-blue-300">
            <IconCirclePlus className="size-8 text-white" />
            <span className="text-white">Novo</span>
          </Button>
        </div>
      </div>

      <aside className="flex flex-col py-2">
        <span className="text-2xl font-bold">Próximos aniversariantes</span>
        <div className="bg-linear-to-bl from-10% from-violet-300 to-100% to-blue-300 w-full h-24 rounded-xl"></div>
      </aside>

      <aside className="flex flex-col py-2">
        <p>Próximos anisversariantes</p>
        <div className="border w-full h-44 rounded-xl"></div>
      </aside>
    </section>
  );
}
