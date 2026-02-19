import { schema } from "@/components/sidebar/data-table";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import webpush from "web-push";
import z from "zod";

export const membrosRouter = createTRPCRouter({
  list: baseProcedure.query(async ({ ctx }) => {
    return await ctx.pb.collection("membros").getFullList();
  }),
  create: baseProcedure
    .input(
      z.object({
        nome: z.string().min(2),
        sobrenome: z.string().min(2),
        genero: z.string().min(1),
        naturalDe: z.string().min(2),
        rg: z.string().min(8),

        cel: z.string().min(14),
        email: z.string().email(),

        estadoCivil: z.string().min(1),
        conjugue: z.string().optional(),

        cep: z.string().min(8),
        logradouro: z.string().min(2),
        numero: z.string().min(1),
        bairro: z.string().min(2),
        cidade: z.string().min(2),
        estado: z.string().min(2),

        igrejaId: z.string().min(1),
        aceitoPor: z.string().min(1),
        tipo: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const {
        aceitoPor,
        bairro,
        cel,
        cidade,
        cep,
        conjugue,
        email,
        estado,
        estadoCivil,
        igrejaId,
        logradouro,
        nome,
        naturalDe,
        numero,
        rg,
        sobrenome,
        tipo,
      } = input;
      const member = await ctx.pb.collection("membros").create({
        aceitoPor,
        bairro,
        cel,
        cidade,
        cep,
        conjugue,
        email,
        estado,
        estadoCivil,
        igrejaId,
        logradouro,
        nome,
        naturalDe,
        numero,
        rg,
        sobrenome,
        tipo,
      });
      return member;
    }),
});
