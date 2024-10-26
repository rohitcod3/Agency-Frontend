import React, { useState } from "react";
import { createEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

export const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigator = useNavigate();

  function saveEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
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
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  return (
    <div className="text-white border rounded-lg border-slate-400 p-6 w-96">
      <h2 className="text-xl font-bold mb-4">Add Employee</h2>

      <form onSubmit={saveEmployee}>
        <div className="mb-4">
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            placeholder="Enter Employee First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`input input-bordered input-info w-full max-w-xs after:p-2 rounded-md border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Enter Employee Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`p-2 rounded-md border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter Employee Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`p-2 rounded-md border ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
