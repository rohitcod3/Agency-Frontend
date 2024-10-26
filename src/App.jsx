import "./App.css";
import { EmployeeComponent } from "./components/EmployeeComponent";
import { ListEmployeeComponent } from "./components/ListEmployeeComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
