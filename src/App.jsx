import "./App.css";
import { EmployeeComponent } from "./components/EmployeeComponent";
import { ListEmployeeComponent } from "./components/ListEmployeeComponent";
import { ClientComponent } from "./components/ClientComponent.jsx";
import { ListClientComponent } from "./components/ListClientComponent.jsx";
import { ProjectComponent } from "./components/ProjectComponent.jsx";
import { ListProjectComponent } from "./components/ListProjectComponent.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Employee Routes */}
        <Route
          path="/"
          element={<ListEmployeeComponent className="text-white" />}
        ></Route>
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
    </BrowserRouter>
  );
}

export default App;
