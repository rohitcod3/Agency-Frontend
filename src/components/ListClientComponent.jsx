import React, { useEffect, useState } from "react";
import { listClients, deleteClient } from "../services/ClientService";
import { useNavigate } from "react-router-dom";

export const ListClientComponent = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllClients();
  }, []);
  console.log("this is clients: ", clients);
  const getAllClients = () => {
    listClients()
      .then((response) => {
        console.log(response.data);
        console.log(Array.isArray(response.data));
        setClients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addNewClient = () => {
    navigate("/add-client");
  };

  const updateClient = (id) => {
    navigate(`/update-client/${id}`);
  };

  const removeClient = (id) => {
    deleteClient(id)
      .then(() => {
        getAllClients();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">List of Clients</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-green-600"
        onClick={addNewClient}
      >
        Add Client
      </button>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Client ID</th>
            <th className="border px-4 py-2">Client Name</th>
            <th className="border px-4 py-2">Client Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            console.log("Rendering client with ID:", client); // Log client ID
            return (
              <tr key={client.clientId}>
                <td className="border px-4 py-2">{client.clientId}</td>
                <td className="border px-4 py-2">{client.clientName}</td>
                <td className="border px-4 py-2">{client.clientEmail}</td>
                <td className="border px-4 py-2">{client.phone}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
                    onClick={() => updateClient(client.id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    onClick={() => removeClient(client.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
