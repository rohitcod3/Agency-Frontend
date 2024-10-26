import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

const listEmployees = () =>{
    return axios.get(REST_API_BASE_URL);
}

export const createEmployee = (employee) =>{
    return axios.post(REST_API_BASE_URL, employee)
}
export default listEmployees;