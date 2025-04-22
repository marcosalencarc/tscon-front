import { RoleEnum } from "@/model/enums/role.enum";
import type { MemberFormData } from "@/pages/associations/modal-adicionar-membro";

export const verifyMembersRoles = (members: MemberFormData[]) => {
  let result = true;
  result = !!members.find(member => RoleEnum[member.memberRole] === RoleEnum.PRESIDENTE)
  result = !!members.find(member => RoleEnum[member.memberRole] === RoleEnum.PRIMEIRO_SECRETARIO)
  result = !!members.find(member => RoleEnum[member.memberRole] === RoleEnum.PRIMEIRO_CONSELHEIRO)
  result = !!members.find(member => RoleEnum[member.memberRole] === RoleEnum.PRIMEIRO_TESOUREIRO)
  return result
}