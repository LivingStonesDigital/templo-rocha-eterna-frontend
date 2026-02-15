"use client";
import { Button } from "@/components/ui/button";
import { pb } from "@/constanst";
import Image from "next/image";

export default function Home() {
  const criarUser = async () => {
    const generateId = () => Math.random().toString(36).substring(2, 9);
    const id = generateId();
    try {
      // 1️⃣ cria o membro
      const member = await pb.collection("membros").create({
        name: `João Silva + ${id}`,
        // outros campos...
      });

      // 2️⃣ cria a notificação
      await pb.collection("notifications").create({
        title: "Novo membro cadastrado",
        message: `O membro ${member.name} foi adicionado.`,
        member_id: member.id,
        read: false,
      });

      console.log("Membro e notificação criados com sucesso");
    } catch (error) {
      console.error("Erro ao criar membro:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Button onClick={criarUser}>Criar membro</Button>
    </div>
  );
}
