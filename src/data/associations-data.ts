

import type { Association } from "@/model/association.model";
import { func } from "prop-types";

// biome-ignore lint/style/noVar: <explanation>
var associationsTableData: Association[] = [
  {
    id:1,
    img: "/img/logo-xd.svg",
    name: "Associação 1",
    folderNumber: "12234356",
    cnpj: "12345678901234",
    fantasyName: "Associação 1 - Nome Fantasia",
    address: "Rua 1, 123, Bairro, Cidade, Estado, CEP",
    foundationDate: new Date("17/03/25"),
    statuteChangeDate:  new Date("17/03/25"),
    boardElectionDate:  new Date("17/03/25"),
    registerNumber: "12345678901234",
    registerDate:  new Date("17/03/25"),
    members: [
      { img: "/img/team-1.jpeg", name: "Rona Hid", nacionality: "Brasileiro", civilState: "Solteiro", address: "Rua 1, 123, Bairro, Cidade, Estado, CEP", document: "12345678901", cpf: "12345678901" },
      { img: "/img/team-1.jpeg", name: "Rona Hadid", nacionality: "Brasileiro", civilState: "Solteiro", address: "Rua 1, 123, Bairro, Cidade, Estado, CEP", document: "12345678901", cpf: "12345678901" },
      { img: "/img/team-1.jpeg", name: "Rina Hadid", nacionality: "Brasileiro", civilState: "Solteiro", address: "Rua 1, 123, Bairro, Cidade, Estado, CEP", document: "12345678901", cpf: "12345678901" },
      { img: "/img/team-1.jpeg", name: "Romina Hid", nacionality: "Brasileiro", civilState: "Solteiro", address: "Rua 1, 123, Bairro, Cidade, Estado, CEP", document: "12345678901", cpf: "12345678901" },
    ],
    status: true,
    createdAt: new Date(),
  },
  {
    id:2,
    img: "/img/logo-xd.svg",
    name: "Associação 2",
    folderNumber: "12234356",
    cnpj: "12345678901234",
    fantasyName: "Associação 1 - Nome Fantasia",
    address: "Rua 1, 123, Bairro, Cidade, Estado, CEP",
    foundationDate: new Date("17/03/25"),
    statuteChangeDate:  new Date("17/03/25"),
    boardElectionDate:  new Date("17/03/25"),
    registerNumber: "12345678901234",
    registerDate:  new Date("17/03/25"),
    members: [
      { img: "/img/team-1.jpeg", name: "Rona Had", nacionality: "Brasileiro", civilState: "Solteiro", address: "Rua 1, 123, Bairro, Cidade, Estado, CEP", document: "12345678901", cpf: "12345678901" },
      { img: "/img/team-1.jpeg", name: "Rna Hadid", nacionality: "Brasileiro", civilState: "Solteiro", address: "Rua 1, 123, Bairro, Cidade, Estado, CEP", document: "12345678901", cpf: "12345678901" },
      { img: "/img/team-1.jpeg", name: "Romina Hd", nacionality: "Brasileiro", civilState: "Solteiro", address: "Rua 1, 123, Bairro, Cidade, Estado, CEP", document: "12345678901", cpf: "12345678901" },
    ],
    status: true,
    createdAt: new Date(),
  },
  {
    id:3,
    img: "/img/logo-xd.svg",
    name: "Associação 3",
    folderNumber: "12234356",
    cnpj: "12345678901234",
    fantasyName: "Associação 3 - Nome Fantasia",
    address: "Rua 1, 123, Bairro, Cidade, Estado, CEP",
    foundationDate: new Date("17/03/25"),
    statuteChangeDate:  new Date("17/03/25"),
    boardElectionDate:  new Date("17/03/25"),
    registerNumber: "12345678901234",
    registerDate:  new Date("17/03/25"),
    members: [
      { img: "/img/team-1.jpeg", name: "Roina Had", nacionality: "Brasileiro", civilState: "Solteiro", address: "Rua 1, 123, Bairro, Cidade, Estado, CEP", document: "12345678901", cpf: "12345678901" },
      { img: "/img/team-1.jpeg", name: "Romia Hadd", nacionality: "Brasileiro", civilState: "Solteiro", address: "Rua 1, 123, Bairro, Cidade, Estado, CEP", document: "12345678901", cpf: "12345678901" },
    ],
    status: true,
    createdAt: new Date(),
  },
  {
    id:4,
    img: "/img/logo-xd.svg",
    name: "Associação 1",
    folderNumber: "12234356",
    cnpj: "12345678901234",
    fantasyName: "Associação 4 - Nome Fantasia",
    address: "Rua 1, 123, Bairro, Cidade, Estado, CEP",
    foundationDate: new Date("17/03/25"),
    statuteChangeDate:  new Date("17/03/25"),
    boardElectionDate:  new Date("17/03/25"),
    registerNumber: "12345678901234",
    registerDate:  new Date("17/03/25"),
    members: [
      { img: "/img/team-1.jpeg", name: "Romia Hadid", nacionality: "Brasileiro", civilState: "Solteiro", address: "Rua 1, 123, Bairro, Cidade, Estado, CEP", document: "12345678901", cpf: "12345678901" },
      { img: "/img/team-1.jpeg", name: "mina Hadid", nacionality: "Brasileiro", civilState: "Solteiro", address: "Rua 1, 123, Bairro, Cidade, Estado, CEP", document: "12345678901", cpf: "12345678901" },
      { img: "/img/team-1.jpeg", name: "Rona Hadid", nacionality: "Brasileiro", civilState: "Solteiro", address: "Rua 1, 123, Bairro, Cidade, Estado, CEP", document: "12345678901", cpf: "12345678901" },
    ],
    status: false,
    createdAt: new Date(),
  },
  {
    id:5,
    img: "/img/logo-xd.svg",
    name: "Associação 4",
    folderNumber: "12234356",
    cnpj: "12345678901234",
    fantasyName: "Associação 4 - Nome Fantasia",
    address: "Rua 1, 123, Bairro, Cidade, Estado, CEP",
    foundationDate: new Date("17/03/25"),
    statuteChangeDate:  new Date("17/03/25"),
    boardElectionDate:  new Date("17/03/25"),
    registerNumber: "12345678901234",
    registerDate:  new Date("17/03/25"),
    members: [
      {  img: "/img/team-1.jpeg", name: "Romina did", nacionality: "Brasileiro", civilState: "Solteiro", address: "Rua 1, 123, Bairro, Cidade, Estado, CEP", document: "12345678901", cpf: "12345678901" },
      { img: "/img/team-1.jpeg", name: "amina Hadid", nacionality: "Brasileiro", civilState: "Solteiro", address: "Rua 1, 123, Bairro, Cidade, Estado, CEP", document: "12345678901", cpf: "12345678901" },
    ],
    status: true,
    createdAt: new Date(),
  },
  {
    id:6,
    img: "/img/logo-xd.svg",
    name: "Associação 5",
    folderNumber: "12234356",
    cnpj: "12345678901234",
    fantasyName: "Associação 5 - Nome Fantasia",
    address: "Rua 1, 123, Bairro, Cidade, Estado, CEP",
    foundationDate: new Date("17/03/25"),
    statuteChangeDate:  new Date("17/03/25"),
    boardElectionDate:  new Date("17/03/25"),
    registerNumber: "12345678901234",
    registerDate:  new Date("17/03/25"),
    members: [
      { img: "/img/team-1.jpeg", name: "Roasana Haid", nacionality: "Brasileiro", civilState: "Solteiro", address: "Rua 1, 123, Bairro, Cidade, Estado, CEP", document: "12345678901", cpf: "12345678901" },
    ],
    status: false,
    createdAt: new Date(),
  },
];

function addItem(item: Association) {
  associationsTableData.push(item);
}

function getAssociations() {
  return associationsTableData;
}

export {addItem, getAssociations};
