import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  membros: defineTable({
    aceitoPor: v.union(
      v.literal("batismo"),
      v.literal("adesao"),
      v.literal("transferencia"),
      v.literal("aclamacao")
    ),
    basedChurchId: v.id("basedChurch"),
    cargoExcercido: v.optional(v.string()),
    cel: v.optional(v.string()),
    conjugue: v.optional(v.string()),
    cpf: v.optional(v.string()),
    dataBatismo: v.optional(v.string()),
    dataNascimento: v.string(),
    desejaExcecerFuncaoNaIgreja: v.optional(v.boolean()),
    email: v.optional(v.string()),
    endereco: v.object({
      bairro: v.string(),
      cep: v.string(),
      cidade: v.string(),
      complemento: v.string(),
      estado: v.string(),
      logradouro: v.string(),
      numero: v.string(),
    }),
    estadoCivil: v.union(
      v.literal("solteiro(a)"),
      v.literal("casado(a)"),
      v.literal("divorciado(a)"),
      v.literal("viuvo(a)"),
      v.literal("separado(a)")
    ),
    genero: v.union(
      v.literal("feminino"),
      v.literal("masculino")
    ),
    igreja: v.optional(v.string()),
    igrejaAnterior: v.optional(v.string()),
    naturalDe: v.optional(v.string()),
    nome: v.string(),
    orgExp: v.optional(v.string()),
    pastor: v.optional(v.string()),
    rg: v.string(),
    sobrenome: v.optional(v.string()),
    talentos: v.optional(v.string()),
    tel: v.optional(v.string()),
    tipo: v.union(
      v.literal("membro"),
      v.literal("congregante"),
      v.literal("frequentador")
    ),
  }).index("by_basedChurch_id", ["basedChurchId"]),
});