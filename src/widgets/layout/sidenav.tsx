import { setOpenSidenav, useMaterialTailwindController } from '@/context'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button, IconButton, Typography } from '@material-tailwind/react'
import type { color } from '@material-tailwind/react/types/components/button'
import { Link, NavLink } from 'react-router-dom'

interface Page {
  icon: React.ReactNode
  name: string
  path: string
}

interface Route {
  layout: string
  title?: string
  isVisibleInSidenav: boolean
  pages: Page[]
}

interface SidenavProps {
  brandImg?: string
  brandName?: string
  routes: Route[]
}

const sidenavTypes = {
  white: 'bg-white shadow-sm',
  transparent: 'bg-transparent',
} as const

export function Sidenav({
  brandImg = '/img/logo-ct.png',
  brandName = 'TSCON Contabilidade e Assessoria',
  routes,
}: SidenavProps) {
  const [controller, dispatch] = useMaterialTailwindController()
  const { sidenavColor, sidenavType, openSidenav } = controller

  return (
    <aside
      className={`${sidenavTypes[sidenavType as keyof typeof sidenavTypes]} ${
        openSidenav ? 'translate-x-0' : '-translate-x-80'
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className="relative">
        <Link to="/" className="py-6 px-8 text-center">
          {brandImg && (
            <img
              src={brandImg}
              alt={brandName}
              className="h-10 w-10 mx-auto mb-2"
            />
          )}
          <Typography variant="h6" color="blue-gray">
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>

      <div className="m-4">
        {routes.map(({ layout, title, pages, isVisibleInSidenav }) =>
          isVisibleInSidenav ? (
            <ul key={`${layout}-${title}`} className="mb-4 flex flex-col gap-1">
              {title && (
                <li className="mx-3.5 mt-4 mb-2">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-black uppercase opacity-75"
                  >
                    {title}
                  </Typography>
                </li>
              )}
              {pages.map(({ icon, name, path }) => (
                <li key={`${layout}-${path}`}>
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? 'gradient' : 'text'}
                        color={isActive ? sidenavColor as color : 'blue-gray'}
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : null
        )}
      </div>
    </aside>
  )
}
Sidenav.displayName = '/src/widgets/layout/sidenav.tsx'

export default Sidenav
