import React, { useCallback, useEffect, useState } from 'react'
import { statisticsCardsData } from '@/data/statistics-cards-data'
import { getAssociations } from '@/data/associations-data'
import { StatisticsCard } from '@/widgets/cards'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import {
  Avatar,
  Card,
  CardHeader,
  Chip,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from '@material-tailwind/react'
import type { color } from '@material-tailwind/react/types/components/card'
import { getDashboardAlertsResume } from '@/http/api'
import type { DashboardAlertsResumeDTO } from '@/model/dashboard-alerts-resume-dto.model'
import { BuildingStorefrontIcon, CalendarDaysIcon, TicketIcon } from '@heroicons/react/24/solid'
import { FullScreenLoader } from '@/components/full-screen-loader'

export function Home(): JSX.Element {
  const [dashboardAlertsResume, setDashboardAlertsResume] =
    useState<DashboardAlertsResumeDTO>()
  const [isLoading, setIsLoading] = useState(false)

  const fetchAlertsResume = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await getDashboardAlertsResume()
      setDashboardAlertsResume(response)
    } catch (error) {
      console.error('Erro ao buscar o resumo dos alertas:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAlertsResume()
  }, [fetchAlertsResume])

  return (
    <div className="mt-12">
      {isLoading && <FullScreenLoader message="Carregando dados.." />}
      {dashboardAlertsResume && (
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          <StatisticsCard
            key={'registered-associations'}
            color={'gray'}
            title={'Associações Cadastradas'}
            icon={React.createElement(BuildingStorefrontIcon, {
              className: 'w-6 h-6 text-white',
            })}
            value={dashboardAlertsResume.numberAssociations.toString()}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong
                  className={'text-green-500'}
                >{`+${dashboardAlertsResume.numberNewAssociationInLastWeek}`}</strong>
                &nbsp;{'na última semana'}
              </Typography>
            }
            route='/modules/associations'
            filter='all'
          />
          <StatisticsCard
            key={'associations-with-mandate-to-expire'}
            color={'gray'}
            title={'Associações com mandato a vencer'}
            icon={React.createElement(CalendarDaysIcon, {
              className: 'w-6 h-6 text-white',
            })}
            value={dashboardAlertsResume.numberOfAssociationWithElectionPeriodToExpireInThisMonth.toString()}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong
                  className={'text-red-500'}
                >{`${dashboardAlertsResume.numberOfAssociationWithElectionPeriodExpired}`}</strong>
                &nbsp;{`${dashboardAlertsResume.numberOfAssociationWithElectionPeriodExpired === 1? 'vencida': 'vencidas'}`}
              </Typography>
            }
            route='/modules/associations'
            filter='mandate_expiring'
          />
          <StatisticsCard
            key={'digital-certificate-to-expire'}
            color={'gray'}
            title={'Associações com certificado a vencer'}
            icon={React.createElement(TicketIcon, {
              className: 'w-6 h-6 text-white',
            })}
            value={dashboardAlertsResume.numberOfAssociationWithDigitalCertificateToExpireInThisMonth.toString()}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong
                  className={'text-red-500'}
                >{`${dashboardAlertsResume.numberOfAssociationWithDigitalCertificateExpired}`}</strong>
                &nbsp;{`${dashboardAlertsResume.numberOfAssociationWithDigitalCertificateExpired === 1? 'vencido': 'vencidos'}`}
              </Typography>
            }
            route='/modules/associations'
            filter='certificate_expiring'
          />
        </div>
      )}
    </div>
  )
}

export default Home
