import React, { useEffect, useState } from "react";
import {
  createProject,
  getProject,
  updateProject,
} from "../services/ProjectService";
import { listClients } from "../services/ClientService";
import { useNavigate, useParams } from "react-router-dom";

export const ProjectComponent = () => {
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [projectType, setProjectType] = useState("");
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState([]);
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getProject(id)
        .then((response) => {
          setProjectName(response.data.projectName);
          setStartDate(response.data.startDate);
          setEndDate(response.data.endDate);
          setStatus(response.data.status);
          setProjectType(response.data.projectType);
          setClientId(response.data.clientId);
        })
        .catch((error) => console.error("Error fetching project:", error));
    }

    listClients()
      .then((response) => setClients(response.data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, [id]);

  const validateFields = () => {
    const errors = {};
    if (!clientId) errors.clientId = "Please select a client.";
    if (!projectName.trim()) errors.projectName = "Project name is required.";
    if (!startDate.trim()) errors.startDate = "Start date is required.";
    if (!endDate.trim()) errors.endDate = "End date is required.";
    if (!status.trim()) errors.status = "Status is required.";
    if (!projectType.trim()) errors.projectType = "Project type is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveOrUpdateProject = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const project = {
      projectName,
      startDate,
      endDate,
      status,
      projectType,
      clientId,
    };

    if (id) {
      updateProject(id, project)
        .then(() => navigate("/projects"))
        .catch((error) => console.error("Error updating project:", error));
    } else {
      createProject(project)
        .then(() => navigate("/projects"))
        .catch((error) => console.error("Error creating project:", error));
    }
  };

  const pageTitle = () => (
    <h2 className="text-xl font-bold mb-4">
      {id ? "Update Project" : "Add Project"}
    </h2>
  );

  return (
    <div className="text-white border rounded-lg border-slate-400 md:min-w-[450px] md:min-h-[550px] flex flex-col justify-center">
      {pageTitle()}

      <form onSubmit={saveOrUpdateProject}>
        <div className="mb-4">
          <label className="block mb-1">Client</label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className={`input input-bordered input-info w-full max-w-[290px] rounded-md border ${
              errors.clientId ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client.clientId} value={client.clientId}>
                {client.clientName}
              </option>
            ))}
          </select>
          {errors.clientId && (
            <p className="text-red-500 text-sm">{errors.clientId}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Project Name</label>
          <input
            type="text"
            placeholder="Enter Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className={`input input-bordered input-info w-full max-w-[290px] rounded-md border ${
              errors.projectName ? "border-red-500" : ""
            }`}
          />
          {errors.projectName && (
            <p className="text-red-500 text-sm">{errors.projectName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`input input-bordered input-info w-full max-w-[290px] rounded-md border ${
              errors.startDate ? "border-red-500" : ""
            }`}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm">{errors.startDate}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={`input input-bordered input-info w-full max-w-[290px] rounded-md border ${
              errors.endDate ? "border-red-500" : ""
            }`}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Status</label>
          <input
            type="text"
            placeholder="Enter Project Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`input input-bordered input-info w-full max-w-[290px] rounded-md border ${
              errors.status ? "border-red-500" : ""
            }`}
          />
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Project Type</label>
          <input
            type="text"
            placeholder="Enter Project Type"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className={`input input-bordered input-info w-full max-w-[290px] rounded-md border ${
              errors.projectType ? "border-red-500" : ""
            }`}
          />
          {errors.projectType && (
            <p className="text-red-500 text-sm">{errors.projectType}</p>
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
