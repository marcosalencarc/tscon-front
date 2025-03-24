import { Auth, Dashboard } from "@/layouts";
import { Navigate, Route, Routes } from "react-router-dom";
import NewAssociation from "./pages/dashboard/new-association";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;
