import React, {useState, useEffect, useRef, isValidElement} from "react";
import {createClient, getClient, updateClient} from "../services/ClientService"
import { useNavigate, useParams } from "react-router-dom";

export const ClientComponent = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const {id} = useParams();
    const [errors, setErrors] = useState({name : "", email: "", phone: ""});

    const formRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(id){
            getClient(id)
            .then((response) => {
                setName(response.data.name);
                setEmail(response.data.email);
                setPhone(response.data.phone);
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }, [id]);
}

const saveOrUpdateClient = (e) => {
    e.preventDefault();
    if(validateForm()){

    }
}

const validateForm = () {
    let valid = true;
    const errorsCopy = {...errors};

    if(name.trim()){
        errorsCopy.name = "";
    }else{
        errorsCopy.name = "Name is required";
        valid = false
    }

    if(email.trim()){
        errorsCopy.email = "";
    }else{
        errorsCopy.email = "Email is required";
        valid = false;
    }
    setErrors(errorsCopy);
    return valid;
};

const pageTitle = () => (
    <h2 className="text-xl font-bold mb-4">
        {id ? "Update Client" : "Add Client"}
    </h2>
);


return(
    <div className = "text-white border rounded-lg border-slate-400 md:min-w-[450px] md:min-h-[550px] flex flex-col justify-center">
        {pageTitle()}

        <form onSubmit={saveOrUpdateClient} ref={formRef}>
        <div className="mb-4">
        <label className="block m-1">Name</label>
        <input
        type="text"
        placeholder="Enter client Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className = {`input input-bordered input-info w-full max-w-[290px] rounded-md border ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.name && (
            <p className = "text-red-500 text-sm mt-1">{errors.name}</p>
        )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter Client Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`input input-bordered input-info w-full max-w-[290px] rounded-md border ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Phone</label>
          <input
            type="text"
            placeholder="Enter Client Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`input input-bordered input-info w-full max-w-[290px] rounded-md border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
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
)

