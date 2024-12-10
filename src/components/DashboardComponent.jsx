import React from "react";
import { useNavigate } from "react-router-dom";

export const DashboardComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 ">
      <h2 className="text-3xl font-bold mb-6 text-center mt-0">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="p-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 cursor-pointer"
          onClick={() => navigate("/clients")}
        >
          <h3 className="text-xl font-semibold">Clients</h3>
          <p>Manage and add clients</p>
        </div>
        <div
          className="p-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 cursor-pointer"
          onClick={() => navigate("/employees")}
        >
          <h3 className="text-xl font-semibold">Employees</h3>
          <p>Manage and add employees</p>
        </div>
        <div
          className="p-4 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 cursor-pointer"
          onClick={() => navigate("/projects")}
        >
          <h3 className="text-xl font-semibold">Projects</h3>
          <p>Manage and add projects</p>
        </div>
      </div>
    </div>
  );
};
