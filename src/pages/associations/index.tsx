import { getAssociations } from '@/data/associations-data'
import type { Association } from '@/model/association.model'
import { formatCnpj, getInitials } from '@/utils/string-utils'
import {
  MagnifyingGlassIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Tooltip,
  Typography,
} from '@material-tailwind/react'
import { ExclamationCircleFilled } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { deleteAssociation, findAssociationsByFilter } from '@/http/api'
import AssociationDetailsModal from './detail-association'
import { set } from 'react-hook-form'
import { Modal } from 'antd'
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal'
import { FullScreenLoader } from '@/components/full-screen-loader'
import { toast } from 'react-toastify'
import type { AssociationFilter } from '@/model/statistics-cards.model'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

type AssociationLocationState = {
  filter?: AssociationFilter 
}

export default function Associations() {
  const [searchTerm, setSearchTerm] = useState('')
  const [startDate, setStartDate] = useState<string | null>(null)
  const [endDate, setEndDate] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(true)
  const [associations, setAssociations] = useState<any>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalViewOpen, setIsModalViewOpen] = useState(false)
  const [associationSelected, setAssociationSelected] = useState<Association>()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmDelete, setIsConfirmDelete] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<number | undefined>()
  const [filter, setFilter] = useState<string>('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const navigate = useNavigate()
  const location = useLocation();
  const itemsPerPage = 10

  useEffect(() => {
    if (isInitialLoad && location.state?.filter) {
      setFilter(location.state.filter);
      setIsInitialLoad(false);
      
      // Limpa imediatamente o estado da navegação
      navigate(location.pathname, {
        replace: true,
        state: undefined // Limpa explicitamente o estado
      });
    }
  }, [location, navigate, isInitialLoad]);

  const fetchAssociations = useCallback(async () => {
    try {
      const response = await findAssociationsByFilter()
      setAssociations(response)
    } catch (error) {
      console.error('Erro ao buscar associações:', error)
    }
  }, []) 

  useEffect(() => {
    fetchAssociations()
  }, [fetchAssociations])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const filteredAssociations = associations.filter((assoc: Association) => {
    
    const matchesSearch =
      assoc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assoc.folderNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const electionDate = dayjs(assoc.boardElectionDate).add(
      assoc.validateElectionYears,
      'year'
    )
    let filterDashboard = true;
    if(filter && filter !== ''){
      if(filter === 'mandate_expiring'){
        filterDashboard = dayjs(electionDate).isSameOrBefore(dayjs().add(1, 'month').format('YYYY-MM-DD'))
      } else if(filter === 'certificate_expiring'){
        filterDashboard = dayjs(assoc.digitalCertificateValidate).isSameOrBefore(dayjs().add(1,'month'), 'day')
      }
    }

    const isValidDate = electionDate.isValid()

    let inDateRange = true

    if (isValidDate) {
      if (startDate && !endDate) {
        inDateRange = electionDate.isSameOrAfter(dayjs(startDate), 'day')
      } else if (!startDate && endDate) {
        inDateRange = electionDate.isSameOrBefore(dayjs(endDate), 'day')
      } else if (startDate && endDate) {
        inDateRange =
          electionDate.isSameOrAfter(dayjs(startDate), 'day') &&
          electionDate.isSameOrBefore(dayjs(endDate), 'day')
      }
    }

    return matchesSearch && inDateRange && filterDashboard
  })

  const paginatedAssociations = filteredAssociations
    .slice(startIndex, endIndex)
    .sort((a: Association, b: Association) => {
      const getDate = (association: Association) => {
        if (!association.boardElectionDate) return Number.POSITIVE_INFINITY; // ou -Infinity dependendo do comportamento desejado
        return dayjs(association.boardElectionDate)
          .add(association.validateElectionYears || 0, 'year')
          .valueOf();
      };
      
      return getDate(a) - getDate(b);
    })
  const totalPages = Math.ceil(filteredAssociations.length / itemsPerPage)

  const clearFilters = () => {
    setSearchTerm('')
    setStartDate(null)
    setEndDate(null)
    setFilter('')
  }

  const handleView = (id: number | undefined) => {
    const associationToEdit = associations.find(
      (assoc: Association) => assoc.id === id
    )

    navigate('/modules/new-association', {
      state: {
        association: associationToEdit,
        operationFilter: 'view',
      },
    })
  }

  const handleEdit = (id: number | undefined) => {
    const associationToEdit = associations.find(
      (assoc: Association) => assoc.id === id
    )

    navigate('/modules/new-association', {
      state: {
        association: associationToEdit,
        operationFilter: 'edit',
      },
    })
  }

  const handleDelete = (id: number | undefined) => {
    setItemToDelete(id)
    setIsConfirmDelete(true)
  }

  const handleConfirmDelete = async () => {
    setIsConfirmDelete(false)
    setIsLoading(true)
    try {
      if (itemToDelete) {
        await deleteAssociation(itemToDelete)
        toast.success('Associação removida com sucesso! 🎉')
        fetchAssociations()
      }
    } catch (error) {
      toast.error('Erro ao remover associação. Tente novamente.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between align-middle"
        >
          <Typography variant="h5" color="white">
            Associações
          </Typography>
          <button
            onClick={() =>
              navigate('/modules/new-association', {
                state: { operationFilter: 'create' },
              })
            }
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-gray-400 rounded-lg hover:bg-blue-gray-600"
          >
            <PlusCircleIcon className="w-6 h-6" />
            Nova Associação
          </button>
        </CardHeader>

        <Card className="mx-6 mb-4 border border-blue-gray-100">
          <div
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-between px-4 py-3 cursor-pointer bg-blue-gray-50 hover:bg-blue-gray-100 rounded-t"
          >
            <div className="flex items-center gap-2">
              <MagnifyingGlassIcon className="w-5 h-5 text-blue-gray-700" />
              <Typography
                variant="small"
                className="font-medium text-blue-gray-700"
              >
                Filtros de busca
              </Typography>
            </div>
            <Typography variant="small" className="text-sm text-blue-gray-500">
              {showFilters ? 'Ocultar' : 'Mostrar'}
            </Typography>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                key="filters"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-gray-600 mb-1"
                      >
                        Nº da Pasta ou Nome da Associação
                      </Typography>
                      <input
                        type="text"
                        placeholder="Buscar por nº da pasta ou nome..."
                        className="w-96 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-gray-600 mb-1"
                      >
                        Data da eleição
                      </Typography>
                      <div className="flex gap-2 border rounded-lg p-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">De</span>
                          <input
                            type="date"
                            className="border rounded-md px-2 py-1 text-sm"
                            value={startDate || ''}
                            onChange={e => setStartDate(e.target.value || null)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Até</span>
                          <input
                            type="date"
                            className="border rounded-md px-2 py-1 text-sm"
                            value={endDate || ''}
                            onChange={e => setEndDate(e.target.value || null)}
                          />
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <button
                            onClick={() => {
                              setStartDate(
                                dayjs()
                                  .subtract(1, 'month')
                                  .format('YYYY-MM-DD')
                              )
                              setEndDate(dayjs().format('YYYY-MM-DD'))
                            }}
                            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                          >
                            Último mês
                          </button>
                          <button
                            onClick={() => {
                              setStartDate(
                                dayjs()
                                  .subtract(3, 'month')
                                  .format('YYYY-MM-DD')
                              )
                              setEndDate(dayjs().format('YYYY-MM-DD'))
                            }}
                            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                          >
                            Últimos 3 meses
                          </button>
                          <button
                            onClick={() => {
                              setStartDate(
                                dayjs().startOf('year').format('YYYY-MM-DD')
                              )
                              setEndDate(
                                dayjs().endOf('year').format('YYYY-MM-DD')
                              )
                            }}
                            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                          >
                            Este ano
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={clearFilters}
                    className="px-3 py-2 text-sm text-white bg-blue-gray-500 hover:bg-blue-gray-600 rounded-lg"
                  >
                    Limpar Filtros
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  'Nº da Pasta',
                  'nome',
                  'CNPJ',
                  'membros',
                  'data eleição',
                  'status',
                  'Ações',
                ].map(el => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-6 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedAssociations.map(
                (
                  {
                    id,
                    folderNumber,
                    name,
                    cnpj,
                    members,
                    boardElectionDate,
                    validateElectionYears,
                    status,
                  }: Association,
                  key: number
                ) => {
                  const className = `py-3 px-5 ${
                    key === associations.length - 1
                      ? ''
                      : 'border-b border-blue-gray-50'
                  }`

                  return (
                    <tr key={id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {folderNumber}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {formatCnpj(cnpj)}
                          </Typography>
                        </div>
                      </td>
                      <td className={`${className} flex flex-row`}>
                        {members.length > 0 &&
                          members.map(({ member, role }, key) => (
                            <Tooltip
                              key={`${member.id}-${member.name}-${role}`}
                              content={`${member.name} (${role})`}
                            >
                              <span
                                id="avatar"
                                className="p-3 w-4 h-4 flex items-center text-xs justify-center text-white font-bold rounded-full bg-green-500"
                              >
                                {getInitials(member.name)}
                              </span>
                            </Tooltip>
                          ))}
                        {members.length === 0 && (
                          <Typography className="p-2 text-xs font-semibold text-blue-gray-600">
                            Sem Membros cadastrados
                          </Typography>
                        )}
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {dayjs(boardElectionDate)
                            .add(validateElectionYears, 'year')
                            .format('DD/MM/YYYY')}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={status ? 'green' : 'blue-gray'}
                          value={status ? 'ativo' : 'inativo'}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <div className="flex gap-2">
                          <Tooltip content="Visualizar">
                            <button
                              onClick={() => handleView(id)}
                              className="p-1 text-blue-500 hover:text-blue-700"
                            >
                              <MagnifyingGlassIcon className="w-5 h-5" />
                            </button>
                          </Tooltip>
                          <Tooltip content="Editar">
                            <button
                              onClick={() => handleEdit(id)}
                              className="p-1 text-green-500 hover:text-green-700"
                            >
                              <PencilIcon className="w-5 h-5" />
                            </button>
                          </Tooltip>
                          <Tooltip content="Excluir">
                            <button
                              onClick={() => handleDelete(id)}
                              className="p-1 text-red-500 hover:text-red-700"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  )
                }
              )}
            </tbody>
          </table>
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="text-sm text-gray-700 flex items-center">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </CardBody>
        {/* Modal de detalhes da associação */}
        <AssociationDetailsModal
          open={isModalViewOpen}
          setOpen={setIsModalViewOpen}
          association={associationSelected}
        />
        <DeleteConfirmationModal
          visible={isConfirmDelete}
          setVisible={setIsConfirmDelete}
          onConfirm={handleConfirmDelete}
        />
        {isLoading && <FullScreenLoader message="Removendo dados.." />}
      </Card>
    </div>
  )
}
