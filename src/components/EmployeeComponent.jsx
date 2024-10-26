import React, { useEffect, useState, useRef } from "react";
import { createEmployee } from "../services/EmployeeService";
import { getEmployee } from "../services/EmployeeService";
import { updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

export const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { id } = useParams();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const formRef = useRef(null);
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  useEffect(() => {
    // Event listener for clicks outside the form
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        // Clear errors when clicking outside the form
        setErrors({ firstName: "", lastName: "", email: "" });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstName, lastName, email };

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            console.log(employee);

            setFirstName("");
            setLastName("");
            setEmail("");

            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }
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

  function pageTitle() {
    if (id) {
      return <h2 className="text-xl font-bold mb-4">Update Employee</h2>;
    } else {
      return <h2 className="text-xl font-bold mb-4">Add Employee</h2>;
    }
  }

  return (
    <div className="text-white border rounded-lg border-slate-400  md:min-w-[450px] md:min-h-[550px] flex flex-col justify-center">
      {pageTitle()}

      <form onSubmit={saveOrUpdateEmployee} ref={formRef}>
        <div className="mb-4">
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            placeholder="Enter Employee First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`input input-bordered input-info w-full max-w-[290px] after:p-2 rounded-md border ${
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
            className={`input input-bordered input-info w-full max-w-[290px] after:p-2 rounded-md border  ${
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
            className={`input input-bordered input-info w-full max-w-[290px] after:p-2 rounded-md border ${
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
          onClick={saveOrUpdateEmployee}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
