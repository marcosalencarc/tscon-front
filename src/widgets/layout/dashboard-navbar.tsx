import { Link, useLocation } from 'react-router-dom';
import {
  setOpenSidenav,
  useMaterialTailwindController,
} from "@/context";
import {
  Bars3Icon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  UserCircleIcon
} from "@heroicons/react/24/solid";
import {
  Avatar,
  Breadcrumbs,
  Button,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from "@material-tailwind/react";

export const DashboardNavbar = () => {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter(Boolean); // Otimizado com Boolean

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""}`}>
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography variant="small" color="blue-gray" className="font-normal">
              {page}
            </Typography>
          </Breadcrumbs>
        </div>
        
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" crossOrigin={undefined} />
          </div>
          
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          
          <Menu placement="bottom-end">
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <NotificationItem 
                avatarSrc="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                title="New message from Laur"
                time="13 minutes ago"
              />
              <NotificationItem 
                avatarSrc="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                title="New album by Travis Scott"
                time="1 day ago"
              />
              <NotificationItem 
                icon={<CreditCardIcon className="h-4 w-4 text-white" />}
                title="Payment successfully completed"
                time="2 days ago"
                isIcon
              />
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
};

// Componente auxiliar para itens de notificação
interface NotificationItemProps {
  avatarSrc?: string;
  icon?: React.ReactNode;
  title: string;
  time: string;
  isIcon?: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  avatarSrc, 
  icon, 
  title, 
  time, 
  isIcon = false 
}) => (
  <MenuItem className="flex items-center gap-3">
    {isIcon ? (
      <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
        {icon}
      </div>
    ) : (
      <Avatar
        src={avatarSrc}
        alt="notification"
        size="sm"
        variant="circular"
      />
    )}
    <div>
      <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
        <strong>{title.split(' ')[0]}</strong> {title.split(' ').slice(1).join(' ')}
      </Typography>
      <Typography
        variant="small"
        color="blue-gray"
        className="flex items-center gap-1 text-xs font-normal opacity-60"
      >
        <ClockIcon className="h-3.5 w-3.5" /> {time}
      </Typography>
    </div>
  </MenuItem>
);

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.tsx";

export default DashboardNavbar;