import "./App.css";
import { EmployeeComponent } from "./components/EmployeeComponent";
import { ListEmployeeComponent } from "./components/ListEmployeeComponent";
import { ClientComponent } from "./components/ClientComponent"; // Import Client components
import { ListClientComponent } from "./components/ListClientComponent";
import { ProjectComponent } from "./components/ProjectComponent"; // Import Project components
import { ListProjectComponent } from "./components/ListProjectComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Employee Routes */}
          <Route
            path="/"
            element={<ListEmployeeComponent className="text-white" />}
          ></Route>
          <Route
            path="/employees"
            element={<ListEmployeeComponent className="text-white" />}
          ></Route>
          <Route path="/add-employee" element={<EmployeeComponent />}></Route>
          <Route
            path="/update-employee/:id"
            element={<EmployeeComponent />}
          ></Route>

          {/* Client Routes */}
          <Route
            path="/clients"
            element={<ListClientComponent className="text-white" />}
          ></Route>
          <Route path="/add-client" element={<ClientComponent />}></Route>
          <Route
            path="/update-client/:id"
            element={<ClientComponent />}
          ></Route>

          {/* Project Routes */}
          <Route
            path="/projects"
            element={<ListProjectComponent className="text-white" />}
          ></Route>
          <Route path="/add-project" element={<ProjectComponent />}></Route>
          <Route
            path="/update-project/:id"
            element={<ProjectComponent />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
