import React from "react";
import "./GameNavBar.css";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

function GameNavBar() {
  // Check if the user is logged in
  const loggedIn = Auth.loggedIn();
  return (
    <section id="gamenavbar" className="center">
      <header className="row">
        <li>
          <Link id="gamenavbar-items" className="gamenav-item" to="/playground">
            Play Ground
          </Link>
        </li>
        {loggedIn && (
          <>
            <li>
              <Link
                id="gamenavbar-items"
                className="gamenav-item"
                to="/letters"
              >
                Practice Letters
              </Link>
            </li>
            <li>
              <Link
                id="gamenavbar-items"
                className="gamenav-item"
                to="/spellinggame"
              >
                Spelling Game
              </Link>
            </li>
          </>
        )}
      </header>
    </section>
  );
}

export default GameNavBar;
