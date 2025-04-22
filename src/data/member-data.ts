import type { Member } from "@/model/member.model";


const members: Member[] = [
 {
   id: "1",
   name: "Lucas Andrade",
   nationality: "Brasileiro",
   civilState: "Solteiro",
   address: "Rua das Palmeiras, 120 - São Paulo, SP",
   document: "RG 12.345.678-9",
   cpf: "123.456.789-00"
 },
 {
   id: "2",
   name: "Fernanda Lima",
   nationality: "Brasileira",
   civilState: "Casada",
   address: "Av. Central, 800 - Belo Horizonte, MG",
   document: "RG 98.765.432-1",
   cpf: "987.654.321-00"
 },
 {
   id: "3",
   name: "João Pereira",
   nationality: "Brasileiro",
   civilState: "Divorciado",
   address: "Rua do Sol, 45 - Recife, PE",
   document: "RG 33.222.111-0",
   cpf: "111.222.333-44"
 },
 {
   id: "4",
   name: "Aline Souza",
   nationality: "Brasileira",
   civilState: "Solteira",
   address: "Rua Nova, 300 - Curitiba, PR",
   document: "RG 77.888.999-5",
   cpf: "555.666.777-88"
 },
 {
   id: "5",
   name: "Carlos Menezes",
   nationality: "Brasileiro",
   civilState: "Viúvo",
   address: "Travessa das Laranjeiras, 10 - Salvador, BA",
   document: "RG 66.555.444-3",
   cpf: "999.888.777-66"
 }
];

export function getRandomMember(): Member {
 const index = Math.floor(Math.random() * members.length);
 return members[index];
}