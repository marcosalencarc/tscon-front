import type { Association } from "@/model/association.model";
import type { RoleEnum } from "@/model/enums/role.enum";
import type { Member } from "@/model/member.model";

export interface MemberAssociation {
    association?: Association,
    member: Member,
    role: RoleEnum
}