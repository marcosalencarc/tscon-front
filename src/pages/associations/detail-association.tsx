import React from 'react'
import { Dialog, Button, Typography } from '@material-tailwind/react'
import type { Association } from '@/model/association.model'
import { formatCnpj, formatCpf } from '@/utils/string-utils'

interface AssociationDetailsModalProps {
  open: boolean
  setOpen: (value: boolean) => void
  association?: Association
}

const AssociationDetailsModal = ({ open, setOpen, association }: AssociationDetailsModalProps) => {
  if (!association) {
    return null; // Ou outro componente de carregamento se necessário
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} handler={handleClose}>
      <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <Typography variant="h6" className="mb-4 text-center text-xl font-semibold">
          Detalhes da Associação
        </Typography>

        {/* Dados da Associação */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Typography className="font-semibold">Nome da Associação:</Typography>
              <Typography>{association.name}</Typography>
            </div>
            <div>
              <Typography className="font-semibold">Nome Fantasia:</Typography>
              <Typography>{association.fantasyName}</Typography>
            </div>
            <div>
              <Typography className="font-semibold">CNPJ:</Typography>
              <Typography>{formatCnpj(association.cnpj)}</Typography>
            </div>
            <div>
              <Typography className="font-semibold">Endereço:</Typography>
              <Typography>{association.address}</Typography>
            </div>
            <div>
              <Typography className="font-semibold">Data de Fundação:</Typography>
              <Typography>{new Date(association.foundationDate).toLocaleDateString()}</Typography>
            </div>
            <div>
              <Typography className="font-semibold">Data de Alteração do Estatuto:</Typography>
              <Typography>{association.statuteChangeDate ? new Date(association.statuteChangeDate).toLocaleDateString() : 'N/A'}</Typography>
            </div>
            <div>
              <Typography className="font-semibold">Data de Registro:</Typography>
              <Typography>{association.registerDate ? new Date(association.registerDate).toLocaleDateString() : 'N/A'}</Typography>
            </div>
            <div>
              <Typography className="font-semibold">Número de Registro:</Typography>
              <Typography>{association.registerNumber || 'N/A'}</Typography>
            </div>
            <div>
              <Typography className="font-semibold">Data de Eleição da Diretoria:</Typography>
              <Typography>{new Date(association.boardElectionDate).toLocaleDateString()}</Typography>
            </div>
            <div>
              <Typography className="font-semibold">Validade dos Mandatos (em anos):</Typography>
              <Typography>{association.validateElectionYears}</Typography>
            </div>
            <div>
              <Typography className="font-semibold">Certificado Digital Criado:</Typography>
              <Typography>{association.digitalCertificateCreated ? new Date(association.digitalCertificateCreated).toLocaleDateString() : 'N/A'}</Typography>
            </div>
            <div>
              <Typography className="font-semibold">Validade do Certificado Digital:</Typography>
              <Typography>{association.digitalCertificateValidate ? new Date(association.digitalCertificateValidate).toLocaleDateString() : 'N/A'}</Typography>
            </div>
          </div>
        </div>

        {/* Membros - Tabela */}
        <div className="mt-6">
          <Typography variant="h6" className="mb-4 text-center text-xl font-semibold">Membros</Typography>
          
          {association.members.length > 0 ? (
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
                      'Cargo'
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
                  {association.members.map(({member, role}) => (
                    <tr key={member.cpf} className="border-b py-1">
                      <td className="py-3 px-5">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {member.name}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {member.nationality}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {member.civilState}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {member.address}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {member.document}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {formatCpf(member.cpf)}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                      <Typography className="text-xs font-normal text-blue-gray-500">
                          {role}
                        </Typography>
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

        {/* Botões */}
        <div className="mt-4 flex justify-end">
          <Button variant="outlined" onClick={handleClose}>Fechar</Button>
        </div>
      </div>
    </Dialog>
  )
}

export default AssociationDetailsModal
