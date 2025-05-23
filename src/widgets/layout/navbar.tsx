import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Collapse,
  IconButton,
  Navbar as MTNavbar,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

interface Route {
  name: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface NavbarProps {
  brandName?: string;
  routes: Route[];
  action?: React.ReactElement;
}

export function Navbar({ 
  brandName = "TSCON Contabilidade e Assessoria", 
  routes, 
  action = (
    <Link to="/home">
      <Button variant="gradient" size="sm" fullWidth>
        Home
      </Button>
    </Link>
  ) 
}: NavbarProps) {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path, icon: Icon }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="blue-gray"
          className="capitalize"
        >
          <Link to={path} className="flex items-center gap-1 p-1 font-normal">
            {Icon && <Icon className="w-[18px] h-[18px] opacity-50 mr-1" />}
            {name}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <MTNavbar className="p-3">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography
            variant="small"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-bold"
          >
            {brandName}
          </Typography>
        </Link>
        
        <div className="hidden lg:block">{navList}</div>
        
        {action && React.cloneElement(action, {
          className: "hidden lg:inline-block",
        })}
        
        <IconButton
          variant="text"
          size="sm"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
          ripple={false}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          {action && React.cloneElement(action, {
            className: "w-full block lg:hidden",
          })}
        </div>
      </Collapse>
    </MTNavbar>
  );
}

Navbar.displayName = "/src/widgets/layout/navbar.tsx";

export default Navbar;