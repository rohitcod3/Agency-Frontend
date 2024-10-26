import "./App.css";
import { ListEmployeeComponent } from "./components/ListEmployeeComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EmployeeComponent } from "./components/EmployeeComponent";
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
