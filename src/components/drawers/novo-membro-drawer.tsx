"use client";

import React from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";

/* =====================================================
   Schema
===================================================== */

const schema = z.object({
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
});

export type FormData = z.infer<typeof schema>;

/* =====================================================
   Utils
===================================================== */

function phoneMask(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value.slice(0, 15);
}

async function buscarCep(cep: string) {
  const clean = cep.replace(/\D/g, "");
  if (clean.length !== 8) return null;

  const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
  const data = await res.json();

  if (data.erro) return null;

  return {
    logradouro: data.logradouro,
    bairro: data.bairro,
    cidade: data.localidade,
    estado: data.uf,
  };
}

/* =====================================================
   Steps
===================================================== */

function StepDados() {
  const {
    register,
    control,
    formState: { errors: error },
  } = useFormContext<FormData>();

  return (
    <div className="mt-4 space-y-4">
      <Label>Informações pessoais</Label>
      <Input placeholder="Nome" {...register("nome")} />
      {error?.nome && (
        <p className="text-destructive text-sm">{error.nome.message}</p>
      )}

      <Input placeholder="Sobrenome" {...register("sobrenome")} />
      {error?.sobrenome && (
        <p className="text-destructive text-sm">{error.sobrenome.message}</p>
      )}

      <Controller
        name="genero"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Gênero" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="feminino">Feminino</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      {error?.genero && (
        <p className="text-destructive text-sm">{error.genero.message}</p>
      )}

      <Input placeholder="Natural de" {...register("naturalDe")} />
      {error?.naturalDe && (
        <p className="text-destructive text-sm">{error.naturalDe.message}</p>
      )}
      <Input placeholder="Numero rg" {...register("rg")} />
      {error?.rg && (
        <p className="text-destructive text-sm">{error.rg.message}</p>
      )}
    </div>
  );
}

function StepContato() {
  const { control, register, setValue } = useFormContext<FormData>();

  return (
    <div className="mt-4 space-y-4">
      <Label>Contato</Label>
      <Controller
        name="cel"
        control={control}
        render={({ field }) => (
          <Input
            placeholder="Celular"
            value={field.value || ""}
            onChange={(e) =>
              setValue("cel", phoneMask(e.target.value), {
                shouldValidate: true,
              })
            }
          />
        )}
      />

      <Input placeholder="Email" {...register("email")} />
    </div>
  );
}

function StepEstadoCivil() {
  const { control, register, watch } = useFormContext<FormData>();

  return (
    <div className="mt-4 space-y-4">
      <Label>Estado Civil</Label>
      <Controller
        name="estadoCivil"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Estado civil" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="solteiro">solteiro(a)</SelectItem>
              <SelectItem value="casado">casado(a)</SelectItem>
              <SelectItem value="divorciado">divorciado(a)</SelectItem>
              <SelectItem value="viuvo">viuvo(a)</SelectItem>
              <SelectItem value="separado">separado(a)</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      {watch("estadoCivil") === "casado" && (
        <Input placeholder="Cônjuge" {...register("conjugue")} />
      )}
      {/* <Input placeholder="Cônjuge" {...register("conjugue")} /> */}
    </div>
  );
}

function StepEndereco() {
  const { register, setValue } = useFormContext<FormData>();

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const data = await buscarCep(e.target.value);
    if (!data) return;

    setValue("logradouro", data.logradouro);
    setValue("bairro", data.bairro);
    setValue("cidade", data.cidade);
    setValue("estado", data.estado);
  };

  return (
    <div className="mt-4 space-y-4">
      <Label>Endereço</Label>
      <Input placeholder="CEP" {...register("cep")} onBlur={handleCepBlur} />
      <Input placeholder="Logradouro" {...register("logradouro")} />
      <Input placeholder="Número" {...register("numero")} />
      <Input placeholder="Bairro" {...register("bairro")} />
      <Input placeholder="Cidade" {...register("cidade")} />
      <Input placeholder="Estado" {...register("estado")} />
    </div>
  );
}

function StepIgreja() {
  const { control } = useFormContext<FormData>();

  const igrejas = [
    { id: "1", nome: "Sede" },
    { id: "2", nome: "Centro" },
    { id: "3", nome: "Zona Norte" },
  ];

  return (
    <div className="mt-4 space-y-4">
      <Controller
        name="igrejaId"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Igreja" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {igrejas.map((i) => (
                <SelectItem key={i.id} value={i.id}>
                  {i.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      <Controller
        name="aceitoPor"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Aceito por" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="batismo">batismo</SelectItem>
              <SelectItem value="adesao">adesao</SelectItem>
              <SelectItem value="transferencia">transferencia</SelectItem>
              <SelectItem value="aclamacao">aclamacao</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Controller
        name="tipo"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="membro">membro</SelectItem>
              <SelectItem value="congregante">congregante</SelectItem>
              <SelectItem value="frequentador">frequentador</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}

/* =====================================================
   Main
===================================================== */

const steps = [
  StepDados,
  StepContato,
  StepEstadoCivil,
  StepEndereco,
  StepIgreja,
];

const stepFields: (keyof FormData)[][] = [
  ["nome", "sobrenome", "genero", "naturalDe", "rg"],
  ["cel", "email"],
  ["estadoCivil"],
  ["cep", "logradouro", "numero", "bairro", "cidade", "estado"],
  ["igrejaId", "aceitoPor", "tipo"],
];

const TOTAL_STEPS = steps.length;

export default function NovoMembroDrawer() {
  const trpc = useTRPC();
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const { handleSubmit, trigger, watch, reset } = methods;

  /* Draft autosave */
  React.useEffect(() => {
    const sub = watch((data) => {
      localStorage.setItem("novo-membro-draft", JSON.stringify(data));
    });
    return () => sub.unsubscribe();
  }, [watch]);

  /* Load draft */
  React.useEffect(() => {
    const draft = localStorage.getItem("novo-membro-draft");
    if (draft) reset(JSON.parse(draft));
  }, []);

  const handleOpenChange = (state: boolean) => {
    setOpen(state);
    if (!state) {
      setStep(0);
      reset();
      localStorage.removeItem("novo-membro-draft");
    }
  };

  const nextStep = async () => {
    const fields = stepFields[step];
    const valid = await trigger(fields);
    if (valid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: FormData) => {
    console.log("Submit:", data);
    localStorage.removeItem("novo-membro-draft");
    await mutate(data);
    setOpen(false);
  };

  const { mutate, isPending } = useMutation(trpc.membros.create.mutationOptions({
      onSuccess: () => {
      
        setOpen(false);
        toast.success("Membro criado com sucesso!");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }),
  );

  const CurrentStep = steps[step];
  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button>Novo</Button>
      </DrawerTrigger>

      <DrawerContent className="h-full">
        <DrawerHeader>
          <DrawerTitle>Novo Membro</DrawerTitle>
        </DrawerHeader>

        {/* Progress */}
        <div className="px-4 mb-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Etapa {step + 1} de {TOTAL_STEPS}
          </p>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between h-full px-4 pb-6"
          >
            <div className="flex-1 overflow-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                >
                  <CurrentStep />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-2">
              {step > 0 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Voltar
                </Button>
              )}

              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  const data = methods.getValues();
                  localStorage.setItem(
                    "novo-membro-draft",
                    JSON.stringify(data),
                  );
                  toast.info("Rascunho salvo");
                  setOpen(false);
                }}
              >
                Salvar rascunho
              </Button>

              {step < TOTAL_STEPS - 1 && (
                <Button type="button" onClick={nextStep}>
                  Próximo
                </Button>
              )}

              {step === TOTAL_STEPS - 1 && (
                <Button type="submit" disabled={isPending}>
                  {isPending && (
                    <Spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Criar
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
}
