import { useMaterialTailwindController } from "@/context";
import NewAssociation from "@/pages/dashboard/new-association";
import routes from "@/routes";
import {
  DashboardNavbar,
  Footer,
  Sidenav,
} from "@/widgets/layout";
import { Route, Routes } from "react-router-dom";

export function Dashboard() {
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
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route key={path.toString()} exact path={path} element={element} />
              ))
          )}
          <Route key={"/new-association"} exact path="/new-association" element={<NewAssociation/>}/>
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
