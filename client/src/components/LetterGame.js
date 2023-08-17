import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CustomButtonStyle } from "./chakraStyle";
import { Button, Flex, chakra, Box } from "@chakra-ui/react";
const CustomButton = chakra(Button, CustomButtonStyle);

function LetterGame({ letters }) {
  // State variable
  const [currentLetter, setCurrentLetter] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [score, setScore] = useState(0);
  const [showCongratulation, setShowCongratulation] = useState(false);

  // Generate random letter
  const randomLetter = () => {
    const randomIndex = Math.floor(Math.random() * letters.length) - 1;
    return letters[randomIndex];
  };

  // Start the game
  const playGame = () => {
    // Show the next random letter if the score is less than 5, otherwise it clears everything
    if (score !== 5) {
      const letter = randomLetter();
      setCurrentLetter(letter);
      // setUserGuess("");
      setScore(0);
      setShowCongratulation(false);
    } else {
      setUserGuess("");
      setCurrentLetter("");
      setScore(0);
      setShowCongratulation(false);
    }
  };

  // Check the user guess
  const checkUserGuess = () => {
    playGame();
    if (
      userGuess &&
      userGuess.toUpperCase() === letters[letters.indexOf(currentLetter) + 1]
    ) {
      if (score < 4) {
        setScore(score + 1);
      } else if (score === 4) {
        setScore(score + 1);
        setShowCongratulation(true);
      }
      setUserGuess("");
    }
  };

  return (
    <div>
      <h3 style={{ color: "gold", fontSize: "30px" }}>Guess the Next Letter</h3>
      <p style={{ color: "white", fontSize: "30px" }}>Score: {score}</p>

      <Flex justifyContent={"center"}>
        <div>
          <p style={{ color: "white" }}>What letter comes after: </p>
          {score < 5 && (
            <h4 style={{ color: "gold", fontSize: "30px" }}>{currentLetter}</h4>
          )}

          {
            <input
              className="letter-input"
              style={{ padding: "5px" }}
              type="text"
              name="userInput"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="write here"
            />
          }

          <CustomButton onClick={checkUserGuess}>Submit</CustomButton>
          {score === 5 && showCongratulation && (
            <div style={{ color: "white" }}>
              <p>Congratulation! You have completed the game.</p>
              <Box p={2} color="goldenrod">
                <Link p={{ base: 2, md: 10 }} to="/spellinggame">
                  Play Spelling Game
                </Link>
              </Box>

              <Box
                p={2}
                style={{
                  color: "goldenrod",
                  border: "2px",
                  borderColor: "yellow",
                }}
              >
                <Link p={{ base: 2, md: 10 }} to="/playground">
                  Go to Play Ground
                </Link>
              </Box>
            </div>
          )}

          {userGuess && (
            <p>
              {userGuess.toUpperCase() ===
              letters[letters.indexOf(currentLetter) + 1]
                ? "Correct!"
                : `Oops! The correct answer is ${
                    letters[letters.indexOf(currentLetter) + 1]
                  }`}
            </p>
          )}
        </div>
      </Flex>

      <CustomButton onClick={playGame}>Play</CustomButton>
    </div>
  );
}

function AllLettersInOne(props) {
  const CustomButton = chakra(Button, CustomButtonStyle);
  return (
    <Flex justifyContent={"center"}>
      <div>
        {props.letters.map((letter, index) => (
          <CustomButton
            className="start-stop-button"
            key={index}
            onClick={() => props.onClick(letter)}
          >
            {letter}
          </CustomButton>
        ))}
      </div>
    </Flex>
  );
}

export default LetterGame;
export { AllLettersInOne };
