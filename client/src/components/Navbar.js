import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Tooltip, Avatar } from "@chakra-ui/react";

import Auth from '../utils/auth'; // Make sure this path is correct
import goatAvatar from "../assets/goat.jpg";

const style = {
  logoImage: {
    maxWidth: "4rem",
  },
};

function Navbar() {
  const [userAvatar, setUserAvatar] = useState(null);
  const isLoggedIn = Auth.loggedIn();

  useEffect(() => {
    if (isLoggedIn) {
      const userData = Auth.getProfile();
      if (userData.avatar) {
        setUserAvatar(userData.avatar);
      }
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <section id="navbar">
      <header className="row">
        <Tooltip label="Go to home" placement="bottom-end">
          <Link to="/">
            <img src="/images/logo.png" style={style.logoImage} alt="Logo" />
            <h1>ABC GOAT</h1>
          </Link>
        </Tooltip>
        <div className="nav-descriptive-image">
          <img src="/images/abc-top.png" alt="ABC" />
        </div>

        <Breadcrumb separator="|">
          <BreadcrumbItem>
            <Link className="nav-item" to="/">
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link className="nav-item" to="/login">
              Login
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link className="nav-item" to="/signup">
              Signup
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link className="nav-item" to="/profile">
              My profile
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a className="nav-item" onClick={handleLogout}>
              Logout
            </a>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Conditionally render the goat avatar based on login status */}
        <div className={`avatar-container ${isLoggedIn ? 'logged-in' : ''}`}>
          {isLoggedIn && (
            <Link to="/profile">
              {userAvatar ? (
                <Avatar src={userAvatar} alt="User Avatar" className="avatar-image" />
              ) : (
                <Avatar src={goatAvatar} alt="Goat Avatar" className="avatar-image" />
              )}
            </Link>
          )}
        </div>
      </header>
    </section>
  );
}

export default Navbar;
