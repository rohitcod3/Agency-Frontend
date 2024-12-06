import React, { useState, useEffect, useRef } from "react";
import {
  createClient,
  getClient,
  updateClient,
} from "../services/ClientService";
import { useNavigate, useParams } from "react-router-dom";

export const ClientComponent = () => {
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const { id } = useParams();
  const [errors, setErrors] = useState({});

  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getClient(id)
        .then((response) => {
          console.log("response", response.data);
          const client = response.data;
          setClientName(client.clientName);
          setCompanyName(client.companyName);
          setClientEmail(client.clientEmail);
          setAddress(client.address);
          setPhone(client.phone);
          setIndustry(client.industry);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const saveOrUpdateClient = (e) => {
    e.preventDefault();

    const client = {
      clientName,
      companyName,
      clientEmail,
      address,
      phone,
      industry,
    };

    if (id) {
      updateClient(id, client)
        .then(() => navigate("/clients"))
        .catch((error) => console.error(error));
    } else {
      createClient(client)
        .then(() => navigate("/clients"))
        .catch((error) => console.error(error));
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = {};

    if (!clientName.trim()) {
      errorsCopy.clientName = "Client Name is required";
      valid = false;
    }

    if (!clientEmail.trim()) {
      errorsCopy.clientEmail = "Client Email is required";
      valid = false;
    }

    if (!phone.trim()) {
      errorsCopy.phone = "Phone number is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const pageTitle = () => (
    <h2 className="text-xl font-bold mb-4">
      {id ? "Update Client" : "Add Client"}
    </h2>
  );

  return (
    <div className="text-white border rounded-lg border-slate-400 md:min-w-[450px] md:min-h-[550px] flex flex-col justify-center">
      {pageTitle()}

      <form onSubmit={saveOrUpdateClient} ref={formRef}>
        <div className="mb-4">
          <label className="block m-1">Client Name</label>
          <input
            type="text"
            placeholder="Enter Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className={`input input-bordered input-info w-full max-w-[290px] rounded-md border ${
              errors.clientName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.clientName && (
            <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block m-1">Company Name</label>
          <input
            type="text"
            placeholder="Enter Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="input input-bordered input-info w-full max-w-[290px] rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block m-1">Client Email</label>
          <input
            type="email"
            placeholder="Enter Client Email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className={`input input-bordered input-info w-full max-w-[290px] rounded-md border ${
              errors.clientEmail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.clientEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.clientEmail}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block m-1">Address</label>
          <input
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input input-bordered input-info w-full max-w-[290px] rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block m-1">Phone</label>
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`input input-bordered input-info w-full max-w-[290px] rounded-md border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block m-1">Industry</label>
          <input
            type="text"
            placeholder="Enter Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="input input-bordered input-info w-full max-w-[290px] rounded-md"
          />
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
