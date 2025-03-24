import type { Member } from "./member.model"

export interface Association {

    id:number
    img: string
    name: string
    folderNumber: string
    cnpj: string
    fantasyName: string
    address: string
    foundationDate: Date
    statuteChangeDate: Date
    boardElectionDate: Date
    registerNumber: string
    registerDate: Date
    members: Member[]
    status: boolean,
    createdAt: Date

}