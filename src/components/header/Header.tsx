import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import { ROUTES } from "../../utils/constants";

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <h3>
            Profile Manager
          </h3>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to={ROUTES.FORM}>
                  Create Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Profiles List
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
