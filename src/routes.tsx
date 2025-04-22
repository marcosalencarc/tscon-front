import { Home } from "@/pages/dashboard";
import {
  BuildingOffice2Icon,
  HomeIcon,
  ServerStackIcon,
} from "@heroicons/react/24/solid";
import Associations from "./pages/associations";
import { SignIn, SignUp } from "./pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    isVisibleInSidenav: true,
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    layout: "modules",
    isVisibleInSidenav: true,
    pages: [
      {
        icon: <BuildingOffice2Icon {...icon} />,
        name: "Associações",
        path: "/associations",
        element: <Associations />,
      },
    ],
  },
  
  {
    title: "auth pages",
    layout: "auth",
    isVisibleInSidenav: false,
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      // {
      //   icon: <RectangleStackIcon {...icon} />,
      //   name: "sign up",
      //   path: "/sign-up",
      //   element: <SignUp />,
      // },
    ],
  },
];

export default routes;
