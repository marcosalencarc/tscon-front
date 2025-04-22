import { RoleEnum } from "@/model/enums/role.enum"
import type { Member } from "@/model/member.model"
import type { MemberFormData } from "@/pages/associations/modal-adicionar-membro"

export const parseMemberToMemberFormData = (
  member: Member
): MemberFormData => {
  return {
    memberName: member.name,
    memberNationality: member.nationality,
    memberMaritalStatus: member.civilState,
    memberAddress: member.address,
    memberRg: member.document,
    memberCpf: member.cpf,
    memberRole: RoleEnum.PRESIDENTE,
  }
}