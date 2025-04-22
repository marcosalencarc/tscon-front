import { useMaterialTailwindController } from "@/context";
import NewAssociation from "@/pages/associations/new-association";
import routes from "@/routes";
import {
  DashboardNavbar,
  Footer,
  Sidenav,
} from "@/widgets/layout";
import { Route, Routes } from "react-router-dom";

export function Modules() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "modules" &&
              pages.map(({ path, element }) => (
                <Route key={path.toString()} path={path} element={element} />
              ))
          )}
          <Route key={"/new-association"} path="/new-association" element={<NewAssociation/>}/>
        </Routes>
        <div className="text-blue-gray-600">
          <Footer brandName={""} brandLink={""} routes={""} />
        </div>
      </div>
    </div>
  );
}
Modules.displayName = "/src/layout/modules.tsx";

export default Modules;
