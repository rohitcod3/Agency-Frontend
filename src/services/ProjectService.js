import axios from "axios";

const PROJECT_API_BASE_URL = 'http://localhost:8080/api/projects';

export const listProjects = () => {
    return axios.get(PROJECT_API_BASE_URL);
};

export const createProject = (project) => {
    return axios.post(PROJECT_API_BASE_URL, project);
};

export const getProject = (projectId) => {
    return axios.get(`${PROJECT_API_BASE_URL}/${projectId}`);
};

export const updateProject = (projectId, project) => {
    return axios.put(`${PROJECT_API_BASE_URL}/${projectId}`, project);
};

export const deleteProject = (projectId) => {
    return axios.delete(`${PROJECT_API_BASE_URL}/${projectId}`);
};

export default listProjects;
