import axios from "axios";

const CLIENT_API_BASE_URL = 'http://localhost:8080/api/clients';

export const listClients = () => {
    return axios.get(CLIENT_API_BASE_URL);
};

export const createClient = (client) => {
    return axios.post(CLIENT_API_BASE_URL, client);
};

export const getClient = (clientId) => {
    return axios.get(`${CLIENT_API_BASE_URL}/${clientId}`);
};

export const updateClient = (clientId, client) => {
    return axios.put(`${CLIENT_API_BASE_URL}/${clientId}`, client);
};

export const deleteClient = (clientId) => {
    return axios.delete(`${CLIENT_API_BASE_URL}/${clientId}`);
};

export default listClients;
