import React, { useEffect, useState } from "react";
import { listClients, deleteClient } from "../services/ClientService";
import { useNavigate } from "react-router-dom";

export const ListClientComponent = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllClients();
  }, []);

  const getAllClients = () => {
    listClients()
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  };

  const addNewClient = () => {
    navigate("/add-client");
  };

  const updateClient = (clientId) => {
    navigate(`/update-client/${clientId}`);
  };

  const removeClient = (clientId) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      deleteClient(clientId)
        .then(() => {
          alert("Client deleted successfully!");
          getAllClients();
        })
        .catch((error) => {
          console.error("Error deleting client:", error);
          alert("Failed to delete client.");
        });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">List of Clients</h2>
      <button
        className="btn btn-outline btn-secondary my-2"
        onClick={addNewClient}
      >
        Add Client
      </button>
      <table className="table">
        <thead>
          <tr className="hover">
            <th className="border px-4 py-2">Client ID</th>
            <th className="border px-4 py-2">Client Name</th>
            <th className="border px-4 py-2">Client Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className=" border-collapse">
          {clients.map((client) => (
            <tr className="hover" key={client.clientId}>
              <td className="border px-4 py-2">{client.clientId}</td>
              <td className="border px-4 py-2">{client.clientName}</td>
              <td className="border px-4 py-2">{client.clientEmail}</td>
              <td className="border px-4 py-2">{client.phone}</td>
              <td className="border px-4 py-2">
                <button
                  className="btn btn-info"
                  onClick={() => updateClient(client.clientId)}
                >
                  Update
                </button>
                <button
                  className="btn btn-error mx-5"
                  onClick={() => removeClient(client.clientId)}
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
