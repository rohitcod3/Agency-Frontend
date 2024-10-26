import React, { useState } from "react";
import { createEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

export const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigator = useNavigate();

  function saveEmployee(e) {
    e.preventDefault();

    const employee = { firstName, lastName, email };
    setFirstName("");
    setLastName("");
    setEmail("");
    console.log(employee);

    createEmployee(employee).then((response) => {
      console.log(response.data);
      navigator("/employees");
    });
  }
  return (
    <div className="table text-white border rounded-lg border-slate-400">
      <div className="card flex flex-col items-center justify-center">
        <h2>Add Employee</h2>
        <div className="card-body">
          <form className="mb-2">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter Employee First Name"
              name="FirstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mx-4 p-2 rounded-md"
            ></input>
          </form>
        </div>

        <div className="card-body">
          <form className="mb-2">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter Employee Last Name"
              name="LastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mx-5 p-2 rounded-md"
            ></input>
          </form>
        </div>

        <div className="card-body">
          <form className="mb-2">
            <label className="mx-3">Email</label>
            <input
              type="text"
              placeholder="Enter Employee Email Id"
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mx-5 p-2 rounded-md"
            ></input>
          </form>

          <button className="btn btn-outline " onClick={saveEmployee}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
