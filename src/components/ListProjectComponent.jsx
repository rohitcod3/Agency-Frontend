import React, { useEffect, useState } from "react";
import { listProjects, deleteProject } from "../services/ProjectService";
import { useNavigate } from "react-router-dom";

export const ListProjectComponent = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProjects();
  }, []);

  // Fetch all projects from the backend
  const fetchAllProjects = () => {
    listProjects()
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  };

  // Navigate to add a new project
  const handleAddNewProject = () => {
    navigate("/add-project");
  };

  // Validate project fields before allowing updates
  const validateProject = (project) => {
    const errors = [];
    if (!project.projectName || project.projectName.trim() === "") {
      errors.push("Project Name cannot be empty.");
    }
    if (!project.clientId || project.clientId <= 0) {
      errors.push("Client ID must be valid.");
    }
    if (!project.startDate || project.startDate.trim() === "") {
      errors.push("Start Date cannot be empty.");
    }
    if (!project.endDate || project.endDate.trim() === "") {
      errors.push("End Date cannot be empty.");
    }
    if (!project.status || project.status.trim() === "") {
      errors.push("Status cannot be empty.");
    }
    if (!project.projectType || project.projectType.trim() === "") {
      errors.push("Project Type cannot be empty.");
    }
    return errors;
  };

  // Navigate to update an existing project
  const handleUpdateProject = (id) => {
    const project = projects.find((p) => p.projectId === id);

    if (project) {
      const errors = validateProject(project);

      if (errors.length > 0) {
        alert(`Validation Errors:\n${errors.join("\n")}`);
        return;
      }

      navigate(`/update-project/${id}`);
    }
  };

  // Delete a project
  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(id)
        .then(() => {
          alert("Project deleted successfully!");
          fetchAllProjects(); // Refresh the list of projects
        })
        .catch((error) => {
          console.error("Error deleting project:", error);
          alert("Failed to delete project.");
        });
    }
  };

  return (
    <div className="p-6 hover">
      <h2 className="text-2xl font-bold mb-4">List of Projects</h2>
      <button
        className="btn btn-outline btn-primary my-2"
        onClick={handleAddNewProject}
      >
        Add Project
      </button>
      <table className="table ">
        <thead>
          <tr className="hover">
            <th className="border px-4 py-2">Project ID</th>
            <th className="border px-4 py-2">Project Name</th>
            <th className="border px-4 py-2">Client ID</th>
            <th className="border px-4 py-2">Start Date</th>
            <th className="border px-4 py-2">End Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Project Type</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="border border-collapse">
          {projects.map((project) => (
            <tr key={project.projectId}>
              <td className="border px-4 py-2">{project.projectId}</td>
              <td className="border px-4 py-2">{project.projectName}</td>
              <td className="border px-4 py-2">{project.clientId}</td>
              <td className="border px-4 py-2">{project.startDate}</td>
              <td className="border px-4 py-2">{project.endDate}</td>
              <td className="border px-4 py-2">{project.status}</td>
              <td className="border px-4 py-2">{project.projectType}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
                  onClick={() => handleUpdateProject(project.projectId)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  onClick={() => handleDeleteProject(project.projectId)}
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
