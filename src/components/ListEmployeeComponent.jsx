import React, { useEffect, useState } from "react";
import listEmployees from "../services/EmployeeService";
import { deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

export const ListEmployeeComponent = () => {
  const [employees, setEmployee] = useState([]);

  const navigator = useNavigate();
  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        console.log("response", response.data);
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function addNewEmployee() {
    navigator("/add-employee");
  }

  function updateEmployee(id) {
    navigator(`/update-employee/${id}`);
  }

  function removeEmployee(id) {
    console.log(id);
    return deleteEmployee(id)
      .then((response) => {
        getAllEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <>
      <div>
        <h2>List of Employees</h2>
        <button
          className="btn btn-outline my-2 btn-primary"
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr className="hover" key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updateEmployee(employee.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-error mx-5"
                    onClick={() => removeEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
