import React from "react";

import { Link, useLocation } from "react-router-dom";

function Navbar() {
  let location = useLocation();

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Luscious Logs
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                } `}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                } `}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          <form className="flex-end">
            <Link className="btn btn-primary me-2" to = "/login" role="button">Login</Link>

            <Link className="btn btn-primary" to = "/signup" role="button">Sign Up</Link>
          </form>
        </div>
      </div>
    </nav>

  );
}

export default Navbar;
