import React, { useEffect, useState } from "react";
import {
  createProject,
  getProject,
  updateProject,
} from "../services/ProjectService";
import { useNavigate, useParams } from "react-router-dom";

export const ProjectComponent = () => {
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [projectType, setProjectType] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      console.log("getproject id data", id);
      getProject(id)
        .then((response) => {
          console.log("api response", response.data);
          setProjectName(response.data.projectName);
          setStartDate(response.data.startDate);
          setEndDate(response.data.endDate);
          setStatus(response.data.status);
          setProjectType(response.data.projectType);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const saveOrUpdateProject = (e) => {
    e.preventDefault();

    const project = {
      clientId: 17, // Use the clientId that works in Postman
      projectName,
      startDate,
      endDate,
      status,
      projectType,
    };

    console.log("projecttt", project);
    if (id) {
      console.log("response", project);
      updateProject(id, project)
        .then(() => navigate("/projects"))
        .catch((error) => console.error(error));
    } else {
      console.log("Creating project:", project);
      createProject(project)
        .then(() => {
          console.log("Project created successfully.");
          navigate("/projects");
        })
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
          <label className="block mb-1">Project Name</label>
          <input
            type="text"
            placeholder="Enter Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="input input-bordered input-info w-full max-w-[290px] rounded-md border"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input input-bordered input-info w-full max-w-[290px] rounded-md border"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input input-bordered input-info w-full max-w-[290px] rounded-md border"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Status</label>
          <input
            type="text"
            placeholder="Enter Project Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input input-bordered input-info w-full max-w-[290px] rounded-md border"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Project Type</label>
          <input
            type="text"
            placeholder="Enter Project Type"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="input input-bordered input-info w-full max-w-[290px] rounded-md border"
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
