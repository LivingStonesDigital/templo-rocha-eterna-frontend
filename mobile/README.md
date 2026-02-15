model Member {
  id               String    @id @default(uuid())
  nome             String
  sobrenome        String
  genero           String?
  dataDeNascimento DateTime?
  
  email            String
  cel              String
  tel              String?

  endereco         String
  numero           String
  bairro           String
  cidade           String
  estado           String
  cep              String
  
  naturalDe        String
  rg               String

  orgExp           String
  estadoCivil      String
  
  dataDeCasamento  DateTime?
  conjugue         String

  dataBatismo                DateTime?
  igreja                     String
  igrejaAnterior             String
  pastor                     String
  cargoExercidos             String
  desejaExerceFuncaoNaIgreja Json
  talentos                   String
  tipo                       TypeMember
  aceitoPor                  TypeAceito

  @@map("member")
}

enum TypeMember {
  MEMBRO
  CONGREGANTE
  FREQUENTADOR
}

enum TypeAceito {
  BATISMO
  ADESAO
  TRANSFERENCIA_DE_IGREJA
  ACLAMACAO
}