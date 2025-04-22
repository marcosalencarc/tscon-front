import {
  DocumentCheckIcon,
  DocumentPlusIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import {
  Button,
  Dialog,
  Input,
  Typography,
  Tooltip,
} from '@material-tailwind/react'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { Association } from '@/model/association.model'
import type { MemberAssociation } from '@/model/member-association.model'
import { RoleEnum } from '@/model/enums/role.enum'
import { createAssociation, updateAssociation } from '@/http/api'
import { formatCpf, getEnumKeyByValue } from '@/utils/string-utils'
import {
  type MemberFormData,
  ModalAdicionarMembro,
} from './modal-adicionar-membro'
import { toast } from 'react-toastify'
import { FullScreenLoader } from '@/components/full-screen-loader'
import { PlusCircleIcon } from 'lucide-react'
import { useAlert } from '@/providers/use-alert-modal'
import { verifyMembersRoles } from '@/utils/association-utils'

const associationSchema = z.object({
  folderNumber: z.string().min(1, 'Número da pasta é obrigatório'),
  name: z.string().min(1, 'Nome da associação é obrigatório'),
  fantasyName: z.string().optional(),
  cnpj: z
    .string()
    .min(14, 'CNPJ deve ter 14 dígitos')
    .max(14, 'CNPJ deve ter 14 dígitos'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  foundationDate: z.string().min(1, 'Data de fundação é obrigatória'),
  statuteChangeDate: z.string().optional(),
  registryDate: z.string().optional(),
  registryNumber: z.string().optional(),
  electionDate: z.string().min(1, 'Data de eleição é obrigatória'),
  validateElectionYears: z
    .number()
    .min(1, 'A validade da eleição é obrigatória'),
  digitalCertificateCreated: z.string().optional(),
  digitalCertificateValidate: z.string().optional(),
  photo: z.any().optional(),
})

type AssociationFormData = z.infer<typeof associationSchema>

type AssociationFormLocationState = {
  association?: Association
  operationFilter: 'create' | 'edit' | 'view'
}

export function NewAssociation() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [members, setMembers] = useState<MemberFormData[]>([])
  const [selectedMember, setSelectedMember] = useState<MemberFormData | null>(
    null
  )

  const location = useLocation()
  const { association, operationFilter } =
    location.state as AssociationFormLocationState

  const [operation, setOperation] = useState<'create' | 'edit' | 'view'>(
    operationFilter
  )

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<AssociationFormData>({
    resolver: zodResolver(associationSchema),
  })

  const getButtonPersistContent = () => {
    switch (operation) {
      case 'view':
        return { label: 'Editar', icon: <PencilIcon className="h-5 w-5" /> }
      case 'edit':
        return {
          label: 'Salvar',
          icon: <DocumentCheckIcon className="h-5 w-5" />,
        }
      case 'create':
        return {
          label: 'Cadastrar',
          icon: <DocumentPlusIcon className="h-5 w-5" />,
        }
    }
  }
  const { label, icon } = getButtonPersistContent()

  useEffect(() => {
    if ((operation === 'edit' || operation === 'view') && association) {
      reset({
        folderNumber: association.folderNumber,
        name: association.name,
        fantasyName: association.fantasyName,
        cnpj: association.cnpj,
        address: association.address,
        foundationDate: association.foundationDate.toString().split('T')[0], // Converter para string de data
        statuteChangeDate: association.statuteChangeDate
          ?.toString()
          .split('T')[0],
        registryDate: association.registerDate?.toString().split('T')[0],
        registryNumber: association.registerNumber,
        electionDate: association.boardElectionDate.toString().split('T')[0],
        validateElectionYears: association.validateElectionYears,
        digitalCertificateCreated: association.digitalCertificateCreated
          ?.toString()
          .split('T')[0],
        digitalCertificateValidate: association.digitalCertificateValidate
          ?.toString()
          .split('T')[0],
      })
      setMembers(
        association.members.map(member => ({
          memberName: member.member.name,
          memberNationality: member.member.nationality,
          memberMaritalStatus: member.member.civilState,
          memberAddress: member.member.address,
          memberRg: member.member.document,
          memberCpf: member.member.cpf,
          memberRole: member.role,
        }))
      )
    }
  }, [operation, association, reset])

  const onSubmit = async (data: AssociationFormData) => {
    if (operation === 'view') {
      setOperation('edit')
      return
    }
    if (!verifyRulesForm(data)) {
      return
    }
    setIsLoading(true)
    try {
      const membersToSubmit: MemberAssociation[] = members.map(member => {
        return {
          member: {
            name: member.memberName,
            nationality: member.memberNationality,
            civilState: member.memberMaritalStatus,
            address: member.memberAddress,
            document: member.memberRg,
            cpf: member.memberCpf,
          },
          role:
            (getEnumKeyByValue(RoleEnum, member.memberRole) as RoleEnum) ??
            member.memberRole,
        }
      })

      const associationToSend: Association = {
        id: association?.id ?? undefined,
        ...data,
        fantasyName: data.fantasyName ?? data.name,
        foundationDate: new Date(data.foundationDate),
        statuteChangeDate: data.statuteChangeDate
          ? new Date(data.statuteChangeDate)
          : null,
        registerDate: data.registryDate ? new Date(data.registryDate) : null,
        registerNumber: data.registryNumber,
        boardElectionDate: new Date(data.electionDate),
        validateElectionYears: data.validateElectionYears,
        digitalCertificateCreated: data.digitalCertificateCreated
          ? new Date(data.digitalCertificateCreated)
          : null,
        digitalCertificateValidate: data.digitalCertificateValidate
          ? new Date(data.digitalCertificateValidate)
          : null,
        members: membersToSubmit,
        status: true,
        createdAt: new Date(),
      }
      if (operation === 'edit' && associationToSend.id) {
        await updateAssociation(associationToSend.id, associationToSend)
        toast.success('Associação atualizada com sucesso! 🎉')
        navigate('/modules/associations')
      } else if (!associationToSend.id) {
        toast.error('Error ao recuperar ID da associação')
      } else {
        await createAssociation(associationToSend)
        toast.success('Associação cadastrada com sucesso! 🎉')
        navigate('/modules/associations')
      }
    } catch (error) {
      toast.error('Erro ao cadastrar associação. Tente novamente.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onAddMember = (data: MemberFormData) => {
    if (selectedMember) {
      setMembers(prev =>
        prev.map(member =>
          member.memberCpf === data.memberCpf ? data : member
        )
      )
      setSelectedMember(null)
    } else {
      setMembers(prev => [...prev, data])
    }
  }

  const handleDeleteMember = (cpf: string) => {
    setMembers(prevMembers =>
      prevMembers.filter(member => member.memberCpf !== cpf)
    )
  }

  const { showAlert } = useAlert()

  const verifyRulesForm = (data: AssociationFormData) => {
    if (members.length < 1 || !verifyMembersRoles(members)) {
      showAlert(
        'warning',
        'Dados Inválidos',
        'É necessário cadastrar pelo menos um membro de cada cargo titular.'
      )
      return false
    }
    return true
  }

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col gap-4">
      <h2 className="text-2xl font-semibold mb-4">
        {operation === 'edit' ? 'Editar Associação' : 'Visualizar Associação'}
      </h2>
      {isLoading && <FullScreenLoader message="Salvando dados.." />}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Seção de informações básicas */}
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <Typography
              variant="small"
              className="text-blue-gray-400 font-bold"
            >
              Nº da Pasta:
            </Typography>
            <Input
              crossOrigin={undefined}
              placeholder="Nº da Pasta"
              {...register('folderNumber')}
              error={!!errors.folderNumber}
              disabled={operation === 'view'} // Campo somente leitura
            />
            {errors.folderNumber && (
              <Typography variant="small" color="red">
                {errors.folderNumber.message}
              </Typography>
            )}
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <Typography
              variant="small"
              className="text-blue-gray-400 font-bold"
            >
              Nº do CNPJ:
            </Typography>
            <InputMask
              mask="99.999.999/9999-99"
              placeholder="Nº do CNPJ"
              disabled={operation === 'view'} // Campo somente leitura
              value={watch('cnpj') || ''}
              onChange={e => {
                const rawValue = e.target.value.replace(/\D/g, '')
                setValue('cnpj', rawValue, { shouldValidate: true })
              }}
            >
              {(inputProps: any) => (
                <Input
                  {...inputProps}
                  crossOrigin={undefined}
                  error={!!errors.cnpj}
                  disabled={operation === 'view'} // Campo somente leitura
                />
              )}
            </InputMask>
            {errors.cnpj && (
              <Typography variant="small" color="red">
                {errors.cnpj.message}
              </Typography>
            )}
          </div>
        </div>

        {/* Nome associação */}
        <div className="flex flex-col gap-1">
          <Typography variant="small" className="text-blue-gray-400 font-bold">
            Nome da Associação:
          </Typography>
          <Input
            crossOrigin={undefined}
            placeholder="Nome da Associação"
            {...register('name')}
            error={!!errors.name}
            disabled={operation === 'view'}
          />
          {errors.name && (
            <Typography variant="small" color="red">
              {errors.name.message}
            </Typography>
          )}
        </div>
        {/* Nome fantasia */}
        <div className="flex flex-col gap-1">
          <Typography variant="small" className="text-blue-gray-400 font-bold">
            Nome de Fantasia:
          </Typography>
          <Input
            crossOrigin={undefined}
            placeholder="Nome de Fantasia"
            {...register('fantasyName')}
            error={!!errors.fantasyName}
            disabled={operation === 'view'}
          />
          {errors.fantasyName && (
            <Typography variant="small" color="red">
              {errors.fantasyName.message}
            </Typography>
          )}
        </div>

        {/* Endereço */}
        <div className="flex flex-col gap-1">
          <Typography variant="small" className="text-blue-gray-400 font-bold">
            Endereço:
          </Typography>
          <Input
            crossOrigin={undefined}
            placeholder="Endereço"
            {...register('address')}
            error={!!errors.address}
            disabled={operation === 'view'}
          />
          {errors.address && (
            <Typography variant="small" color="red">
              {errors.address.message}
            </Typography>
          )}
        </div>

        {/* Data fundção, alteração estatuto e eleiçao */}
        <div className="flex flex-row gap-4">
          <div className="flex-1 flex-col gap-1">
            <Typography
              variant="small"
              className="text-blue-gray-400 font-bold"
            >
              Data da Fundação:
            </Typography>
            <Input
              crossOrigin={undefined}
              type="date"
              {...register('foundationDate')}
              error={!!errors.foundationDate}
              disabled={operation === 'view'}
            />
            {errors.foundationDate && (
              <Typography variant="small" color="red">
                {errors.foundationDate.message}
              </Typography>
            )}
          </div>
          <div className="flex-1 flex-col gap-1">
            <Typography
              variant="small"
              className="text-blue-gray-400 font-bold"
            >
              Data de alteração do estatuto:
            </Typography>
            <Input
              crossOrigin={undefined}
              type="date"
              {...register('statuteChangeDate')}
              error={!!errors.statuteChangeDate}
              disabled={operation === 'view'}
            />
            {errors.statuteChangeDate && (
              <Typography variant="small" color="red">
                {errors.statuteChangeDate.message}
              </Typography>
            )}
          </div>
          <div className="flex-1 flex-col gap-1">
            <Typography
              variant="small"
              className="text-blue-gray-400 font-bold"
            >
              Data Eleição Diretoria:
            </Typography>
            <Input
              crossOrigin={undefined}
              type="date"
              {...register('electionDate')}
              error={!!errors.electionDate}
              disabled={operation === 'view'}
            />
            {errors.electionDate && (
              <Typography variant="small" color="red">
                {errors.electionDate.message}
              </Typography>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Typography
              variant="small"
              className="text-blue-gray-400 font-bold"
            >
              Validade da Eleição (anos):
            </Typography>
            <Input
              crossOrigin={undefined}
              type="number"
              {...register('validateElectionYears', { valueAsNumber: true })}
              error={!!errors.validateElectionYears}
              disabled={operation === 'view'}
            />
            {errors.validateElectionYears && (
              <Typography variant="small" color="red">
                {errors.validateElectionYears.message}
              </Typography>
            )}
          </div>
        </div>

        {/* Datas importantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1">
            <Typography
              variant="small"
              className="text-blue-gray-400 font-bold"
            >
              Data Criação Certificado:
            </Typography>
            <Input
              crossOrigin={undefined}
              type="date"
              {...register('digitalCertificateCreated')}
              error={!!errors.digitalCertificateCreated}
              disabled={operation === 'view'}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Typography
              variant="small"
              className="text-blue-gray-400 font-bold"
            >
              Data Vencimento Certificado:
            </Typography>
            <Input
              crossOrigin={undefined}
              type="date"
              {...register('digitalCertificateValidate')}
              error={!!errors.digitalCertificateValidate}
              disabled={operation === 'view'}
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <Typography
              variant="small"
              className="text-blue-gray-400 font-bold"
            >
              Número do Registro Cartório:
            </Typography>
            <Input
              crossOrigin={undefined}
              placeholder="Número do Registro Cartório"
              {...register('registryNumber')}
              error={!!errors.registryNumber}
              disabled={operation === 'view'}
            />
            {errors.registryNumber && (
              <Typography variant="small" color="red">
                {errors.registryNumber.message}
              </Typography>
            )}
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <Typography
              variant="small"
              className="text-blue-gray-400 font-bold"
            >
              Data do registro cartório:
            </Typography>
            <Input
              crossOrigin={undefined}
              type="date"
              {...register('registryDate')}
              error={!!errors.registryDate}
              disabled={operation === 'view'}
            />
            {errors.registryDate && (
              <Typography variant="small" color="red">
                {errors.registryDate.message}
              </Typography>
            )}
          </div>
        </div>

        {/* Seção de membros */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Membros</h3>
          <Button
            type="button"
            className="mt-2"
            disabled={operation === 'view'}
            onClick={() => setIsModalOpen(true)}
          >
            Adicionar Membro
          </Button>

          {members.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] table-auto mt-4">
                <thead>
                  <tr>
                    {[
                      'Nome',
                      'Nacionalidade',
                      'Estado Civil',
                      'Endereço',
                      'RG',
                      'CPF',
                      'Cargo',
                      'Ações',
                    ].map(header => (
                      <th
                        key={header}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {header}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {members.map((member, index) => (
                    <tr key={member.memberCpf} className="border-b py-1">
                      <td className="py-3 px-5">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {member.memberName}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {member.memberNationality}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {member.memberMaritalStatus}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {member.memberAddress}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {member.memberRg}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {formatCpf(member.memberCpf)}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {
                            RoleEnum[
                              member.memberRole as unknown as keyof typeof RoleEnum
                            ]
                          }
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex gap-2">
                          <Tooltip content="Editar">
                            <button
                              type="button"
                              disabled={operation === 'view'}
                              onClick={() => {
                                setSelectedMember(member) // membro sendo iterado na lista
                                setIsModalOpen(true)
                              }}
                              className={`p-1 rounded transition 
                                ${
                                  operation === 'view'
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-green-500 hover:text-green-700'
                                }`}
                            >
                              <PencilIcon className="w-5 h-5" />
                            </button>
                          </Tooltip>
                          <Tooltip content="Excluir">
                            <button
                              type="button"
                              disabled={operation === 'view'}
                              onClick={() =>
                                handleDeleteMember(member.memberCpf)
                              }
                              className={`p-1 rounded transition 
                                ${
                                  operation === 'view'
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-red-500 hover:text-red-700'
                                }`}
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Typography className="mt-2 text-sm text-gray-500">
              Nenhum membro adicionado ainda
            </Typography>
          )}
        </div>

        {/* Botão de submit */}
        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            className="px-8 flex items-center gap-3 justify-center"
          >
            {icon}
            {isLoading ? 'Salvando...' : label}
          </Button>
        </div>
      </form>

      {/* Modal para adicionar membros */}
      <Dialog
        open={isModalOpen}
        handler={() => {}} // Handler vazio para desabilitar fechamento
        dismiss={{
          enabled: false, // Desabilita todos os métodos de dismiss
          outsidePress: false, // Especificamente desabilita clique fora
        }}
      >
        <ModalAdicionarMembro
          initialData={selectedMember}
          open={isModalOpen}
          onAdd={onAddMember}
          setIsModalOpen={setIsModalOpen}
          cpfMembersAlreadyExists={members.map(member => member.memberCpf)}
        />
      </Dialog>
    </div>
  )
}

export default NewAssociation
