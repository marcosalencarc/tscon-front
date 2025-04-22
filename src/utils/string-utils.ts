import { RoleEnum } from "@/model/enums/role.enum";

export function getInitials(name: string): string {
 if (!name) return "";

 const parts = name.trim().split(/\s+/); // separa por espaços múltiplos
 const first = parts[0]?.charAt(0).toUpperCase() ?? "";
 const second = parts[1]?.charAt(0).toUpperCase() ?? "";

 return first + second;
}

// Função que retorna a chave do enum a partir do valor
export function getEnumKeyByValue<T extends Record<string, string>>(
 enumObj: T,
 value: string
): keyof T | undefined {
 return Object.keys(enumObj).find((key) => enumObj[key] === value) as keyof T;
}

export const formatCpf = (cpf: string) => {
 return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
}

export const formatCnpj = (cnpj: string) => {
 return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
}

export function isRoleEnum(value: any): value is RoleEnum {
    return Object.values(RoleEnum).includes(value);
  }