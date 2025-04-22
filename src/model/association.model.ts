import type { MemberAssociation } from "./member-association.model"

export interface Association {

    id?:number
    folderNumber: string,
    name: string
    fantasyName: string
    cnpj: string
    address: string
    foundationDate: Date
    statuteChangeDate: Date | null
    registerDate: Date | null
    registerNumber?: string
    boardElectionDate: Date
    validateElectionYears: number
    digitalCertificateCreated: Date | null
    digitalCertificateValidate: Date | null
    members: MemberAssociation[]
    status: boolean,
    createdAt: Date

}