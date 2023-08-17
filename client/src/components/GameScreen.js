import React, { useState } from "react";
import SpellingGame from "./SpellingGame";
import PracticeLetter from "./practiceLetter";
import GameNavBar from "./GameNavBar";
import PlayGround from "./PlayGround";
import Home from "./pages/Home";

function GameScreen() {
  // const [activePage, setActivePage] = useState(" ");

  const [activePage, setActivePage] = useState(" ");

  let currentPage;
  if (activePage === "Play Ground") {
    currentPage = <PlayGround />;
  } else if (activePage === "Practice Letters") {
    currentPage = <PracticeLetter />;
  } else if (activePage === "Spelling Game") {
    currentPage = <SpellingGame />;
  } else if (activePage === "/") {
    currentPage = <Home />;
  }

  return (
    <div>
      <GameNavBar setActivePage={setActivePage} />
      {currentPage}
    </div>
  );
}

export default GameScreen;
