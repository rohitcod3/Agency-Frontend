import React from "react";
import { Link } from "react-router-dom";

export const NavbarComponent = () => {
  return (
    <nav className="navbar bg-base-300 rounded-b-xl  text-neutral-content fixed top-0 left-0 w-full shadow-md">
      <div className="navbar ">
        <Link to="/" className="text-lg font-bold">
          Agency Dashboard
        </Link>
      </div>
      <div>
        <Link to="/" className="btn btn-ghost text-l">
          Dashboard
        </Link>
        <Link to="/clients" className="btn btn-ghost text-l">
          Clients
        </Link>
        <Link to="/employees" className="btn btn-ghost text-l">
          Employees
        </Link>
        <Link to="/projects" className="btn btn-ghost text-l">
          Projects
        </Link>
      </div>
    </nav>
  );
};
