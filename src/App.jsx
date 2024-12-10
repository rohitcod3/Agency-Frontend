import "./App.css";
import { EmployeeComponent } from "./components/EmployeeComponent";
import { ListEmployeeComponent } from "./components/ListEmployeeComponent";
import { ClientComponent } from "./components/ClientComponent";
import { ListClientComponent } from "./components/ListClientComponent";
import { ProjectComponent } from "./components/ProjectComponent";
import { ListProjectComponent } from "./components/ListProjectComponent";
import { DashboardComponent } from "./components/DashboardComponent";
import { NavbarComponent } from "./components/NavbarComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<DashboardComponent />} />

          <Route path="/employees" element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<EmployeeComponent />} />
          <Route path="/update-employee/:id" element={<EmployeeComponent />} />

          <Route path="/clients" element={<ListClientComponent />} />
          <Route path="/add-client" element={<ClientComponent />} />
          <Route path="/update-client/:id" element={<ClientComponent />} />

          <Route path="/projects" element={<ListProjectComponent />} />
          <Route path="/add-project" element={<ProjectComponent />} />
          <Route path="/update-project/:id" element={<ProjectComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
