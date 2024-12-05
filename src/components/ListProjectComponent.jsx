import React, { useEffect, useState } from "react";
import { listProjects, deleteProject } from "../services/ProjectService";
import { useNavigate } from "react-router-dom";

export const ListProjectComponent = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = () => {
    listProjects()
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addNewProject = () => {
    navigate("/add-project");
  };

  const updateProject = (id) => {
    navigate(`/update-project/${id}`);
  };

  const removeProject = (id) => {
    deleteProject(id)
      .then(() => {
        getAllProjects();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">List of Projects</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-green-600"
        onClick={addNewProject}
      >
        Add Project
      </button>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Project ID</th>
            <th className="border px-4 py-2">Project Name</th>
            <th className="border px-4 py-2">Start Date</th>
            <th className="border px-4 py-2">End Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Project Type</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="border px-4 py-2">{project.clientId}</td>
              <td className="border px-4 py-2">{project.projectName}</td>
              <td className="border px-4 py-2">{project.startDate}</td>
              <td className="border px-4 py-2">{project.endDate}</td>
              <td className="border px-4 py-2">{project.status}</td>
              <td className="border px-4 py-2">{project.projectType}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
                  onClick={() => updateProject(project.clientId)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  onClick={() => removeProject(project.clientId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
