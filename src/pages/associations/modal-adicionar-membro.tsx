import { set, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Input,
  Select,
  Option,
  Typography,
} from '@material-tailwind/react'
import InputMask from 'react-input-mask'
import { z } from 'zod'
import { RoleEnum } from '@/model/enums/role.enum'
import { useEffect, useState } from 'react'
import { getEnumKeyByValue } from '@/utils/string-utils'
import { FullScreenLoader } from '@/components/full-screen-loader'
import { getMemberByCpf } from '@/http/api'
import { parseMemberToMemberFormData } from '@/utils/member-utils'
import { useAlert } from '@/providers/use-alert-modal'

const memberSchema = z.object({
  memberName: z.string().min(1, 'Nome é obrigatório'),
  memberNationality: z.string().min(1, 'Nacionalidade é obrigatória'),
  memberMaritalStatus: z.string().min(1, 'Estado civil é obrigatório'),
  memberAddress: z.string().min(1, 'Endereço é obrigatório'),
  memberRg: z.string().min(1, 'RG é obrigatório'),
  memberCpf: z
    .string()
    .min(11, 'CPF deve ter 11 dígitos')
    .max(11, 'CPF deve ter 11 dígitos'),
  memberRole: z.nativeEnum(RoleEnum, {
    errorMap: () => ({ message: 'Selecione um cargo válido' }),
  }),
})

export type MemberFormData = z.infer<typeof memberSchema>

interface ModalAdicionarMembroProps {
  open: boolean
  setIsModalOpen: (value: boolean) => void
  onAdd: (data: MemberFormData) => void
  initialData?: MemberFormData | null
  cpfMembersAlreadyExists: string[]
}

export const ModalAdicionarMembro = ({
  setIsModalOpen,
  onAdd,
  initialData,
  cpfMembersAlreadyExists,
}: ModalAdicionarMembroProps) => {
  const [selectedRole, setSelectedRole] = useState<RoleEnum | null>(null)
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<
    string | null
  >(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fieldsDisabled, setFieldsDisabled] = useState(!initialData) // Desabilita campos se não for edição
  const [lastValidCpf, setLastValidCpf] = useState<string | null>(null)

  const {
    register: registerMember,
    handleSubmit: handleSubmitMember,
    reset: resetMember,
    watch: watchMember,
    setValue: setValueMember,
    formState: { errors: memberErrors },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
  })

  useEffect(() => {
    if (initialData) {
      resetMember(initialData)
      const role =
        RoleEnum[initialData.memberRole as unknown as keyof typeof RoleEnum]
      setSelectedRole(role)
      setValueMember('memberRole', role)
      setSelectedMaritalStatus(initialData.memberMaritalStatus)
      setFieldsDisabled(false) // Habilita campos se for edição
    } else {
      resetMember()
      setSelectedRole(null)
      setSelectedMaritalStatus(null)
      setFieldsDisabled(true) // Desabilita campos para novo membro
    }
  }, [initialData, resetMember, setValueMember])

  // Busca membro quando CPF atinge 11 dígitos
  const handleCpfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '')
    setValueMember('memberCpf', rawValue, { shouldValidate: true })

    if (rawValue.length === 11 && rawValue !== lastValidCpf && !initialData) {
      setLastValidCpf(rawValue)
      setIsLoading(true)
      try {
        const memberData = await getMemberByCpf(rawValue)
        if (memberData?.id) {
          const memberFormData = parseMemberToMemberFormData(memberData)
          resetMember(memberFormData)
          setSelectedRole(memberFormData.memberRole)
          setSelectedMaritalStatus(memberFormData.memberMaritalStatus)
        }
        setFieldsDisabled(false) // Habilita campos após busca
      } catch (error) {
        console.error('Erro ao buscar membro:', error)
        setFieldsDisabled(true)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const { showAlert } = useAlert()

  const handleAdd = (data: MemberFormData) => {
    if (cpfMembersAlreadyExists.includes(data.memberCpf)) {
      showAlert(
        'warning',
        'Usuário já cadastrado !',
        'Já existe um usuário cadastrado para essa associação com esse CPF.'
      )
      return
    }
    onAdd({
      ...data,
      memberRole: getEnumKeyByValue(RoleEnum, data.memberRole) as RoleEnum,
    })
    setSelectedRole(null)
    setIsModalOpen(false)
  }

  const handleRoleChange = (value: string | undefined) => {
    const role = value as RoleEnum
    setSelectedRole(role)
    setValueMember('memberRole', role)
  }

  const handleMaritalStatus = (value: string | undefined) => {
    const maritalStatus = value ?? ''
    setSelectedMaritalStatus(maritalStatus)
    setValueMember('memberMaritalStatus', maritalStatus)
  }

  return (
    <form
      onSubmit={handleSubmitMember(handleAdd)}
      className="p-4 flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold mb-2">Adicionar Membro</h2>

      <div className="flex flex-col gap-1">
        <InputMask
          mask="999.999.999-99"
          placeholder="Número de CPF"
          value={watchMember('memberCpf') || ''}
          onChange={handleCpfChange}
          disabled={!!initialData} // Desabilita CPF se for edição
        >
          {(inputProps: any) => (
            <Input
              {...inputProps}
              crossOrigin={undefined}
              error={!!memberErrors.memberCpf}
              icon={
                isLoading && (
                  <FullScreenLoader message="Buscando informações.." />
                )
              }
            />
          )}
        </InputMask>
        {memberErrors.memberCpf && (
          <Typography variant="small" color="red">
            {memberErrors.memberCpf.message}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Input
          crossOrigin={undefined}
          label="Nome Completo"
          {...registerMember('memberName')}
          error={!!memberErrors.memberName}
          disabled={fieldsDisabled}
        />
        {memberErrors.memberName && (
          <Typography variant="small" color="red">
            {memberErrors.memberName.message}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Input
          crossOrigin={undefined}
          label="Nacionalidade"
          {...registerMember('memberNationality')}
          error={!!memberErrors.memberNationality}
          disabled={fieldsDisabled}
        />
        {memberErrors.memberNationality && (
          <Typography variant="small" color="red">
            {memberErrors.memberNationality.message}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Select
          label="Estado Civil"
          value={selectedMaritalStatus || ''}
          onChange={handleMaritalStatus}
          error={!!memberErrors.memberMaritalStatus}
          disabled={fieldsDisabled}
        >
          <Option value="Solteiro(a)">Solteiro(a)</Option>
          <Option value="Casado(a)">Casado(a)</Option>
          <Option value="Divorciado(a)">Divorciado(a)</Option>
          <Option value="Viúvo(a)">Viúvo(a)</Option>
          <Option value="Separado(a)">Separado(a)</Option>
          <Option value="União Estável">União Estável</Option>
        </Select>
        {memberErrors.memberMaritalStatus && (
          <Typography variant="small" color="red">
            {memberErrors.memberMaritalStatus.message}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Input
          crossOrigin={undefined}
          label="Endereço"
          {...registerMember('memberAddress')}
          error={!!memberErrors.memberAddress}
          disabled={fieldsDisabled}
        />
        {memberErrors.memberAddress && (
          <Typography variant="small" color="red">
            {memberErrors.memberAddress.message}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Input
          crossOrigin={undefined}
          label="Número de RG/Órgão Expedidor/Estado Emissor"
          {...registerMember('memberRg')}
          error={!!memberErrors.memberRg}
          disabled={fieldsDisabled}
        />
        {memberErrors.memberRg && (
          <Typography variant="small" color="red">
            {memberErrors.memberRg.message}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Select
          label="Selecione o Cargo"
          value={selectedRole || ''}
          onChange={handleRoleChange}
          error={!!memberErrors.memberRole}
          disabled={fieldsDisabled}
        >
          {Object.values(RoleEnum).map(role => (
            <Option key={role} value={role}>
              {role}
            </Option>
          ))}
        </Select>
        {memberErrors.memberRole && (
          <Typography variant="small" color="red">
            {memberErrors.memberRole.message}
          </Typography>
        )}
        <input type="hidden" {...registerMember('memberRole')} />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          type="button"
          variant="outlined"
          onClick={() => setIsModalOpen(false)}
          className="mr-2"
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={fieldsDisabled}>
          {initialData ? 'Salvar' : 'Adicionar'}
        </Button>
      </div>
    </form>
  )
}
