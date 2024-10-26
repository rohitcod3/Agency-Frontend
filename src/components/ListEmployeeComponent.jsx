import React, { useEffect, useState } from "react";
import listEmployees from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

export const ListEmployeeComponent = () => {
  const [employees, setEmployee] = useState([]);

  const navigator = useNavigate();
  useEffect(() => {
    listEmployees()
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function addNewEmployee() {
    navigator("/add-employee");
  }
  return (
    <>
      <div>
        <h2>List of Employees</h2>
        <button
          className="btn btn-outline btn-primary"
          onClick={addNewEmployee}
        >
          Add Employee
        </button>
        <table className="table ">
          <thead>
            <tr className="hover">
              <th>Employee Id</th>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email Id</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr className="hover" key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
