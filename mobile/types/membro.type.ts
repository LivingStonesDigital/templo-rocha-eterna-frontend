export type TypeMember = 'MEMBRO' | 'CONGREGANTE' | 'FREQUENTADOR';
export type TypeAceito = 'BATISMO' | 'ADESAO' | 'TRANSFERENCIA' | 'ACLAMACAO';

export type Member = {
  id?: string;

  nome: string;
  sobrenome: string;
  genero?: string;
  dataDeNascimento?: string;

  email: string;
  cel: string;
  tel?: string;

  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;

  rg: string;
  orgExp: string;
  naturalDe: string;

  estadoCivil: string;
  conjugue?: string;
  dataDeCasamento?: string;


  tipo: TypeMember;
  aceitoPor: TypeAceito;
  dataBatismo?: string;
  igreja?: string; //  louveira - valinhos - varzea
  igrejaAnterior?: string;
  pastor?: string;
  cargoExercidos?: string;
  desejaExerceFuncaoNaIgreja?: any;
  talentos?: string;

}