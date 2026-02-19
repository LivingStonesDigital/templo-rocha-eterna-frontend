"use client";

import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { DataTable } from "@/components/sidebar/data-table";
import { SectionCards } from "@/components/sidebar/section-cards";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import data from "@/data.json";
import { IconBell, IconCirclePlus, IconPlus } from "@tabler/icons-react";

export default function Home() {
  const trpc = useTRPC();
  const { isPending, mutate } = useMutation(
    trpc.membros.create.mutationOptions({
      onSuccess: () => {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Membro criado com sucesso!");
          }
        });
      },
    }),
  );

  return (
    <section className="z-0 @container/main flex flex-1 flex-col gap-2 px-6">
      <nav className="flex items-center justify-between  mt-6 py-2">
        <div className="space-y-2">
          <h1>Seja bem-vindo (a)</h1>
          <p>Templo Rocha Eterna</p>
        </div>
        <IconBell className="self-start" size={24} />
      </nav>

      <aside className="bg-primary w-full h-44 rounded-xl"></aside>

      <div className="flex justify-between gap-x-4">
        <div className="w-1/2 h-28 bg-primary rounded-xl">asd</div>
        <div className="w-1/2 h-28 bg-primary rounded-xl">sd</div>
      </div>

      <div className="flex flex-col py-2">
        <span className="text-2xl font-bold">Ações rapidas</span>
        <div>
          <Button className="h-20 w-20 flex flex-col items-center justify-center gap-0 rounded-xl bg-primary">
            <IconCirclePlus className="size-8" />
            <span>Novo</span>
          </Button>
        </div>
      </div>

      <aside className="flex flex-col py-2">
        <span className="text-2xl font-bold">Próximos aniversariantes</span>
        <div className="bg-primary w-full h-24 rounded-xl"></div>
      </aside>

      <aside className="flex flex-col py-2">
        <p>Próximos anisversariantes</p>
        <div className="border w-full h-44 rounded-xl"></div>
      </aside>
    </section>
  );
}
