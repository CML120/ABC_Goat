import React, { useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { CustomButtonStyle } from "./chakraStyle";
import {
  Button,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  chakra,
  Flex,
} from "@chakra-ui/react";
import LetterGame, { AllLettersInOne } from "./LetterGame";

const CustomButton = chakra(Button, CustomButtonStyle);
export default function PracticeLetter() {
  const giphyApiKey = process.env.REACT_APP_GIPHY_API_KEY;
  const gf = new GiphyFetch(giphyApiKey);

  // State variables
  const [userSound, setUserSound] = useState("");
  const [results, setResults] = useState([]);
  const [recognitionInstance, setRecognitionInstance] = useState(null);
  const [showLetters, setShowLetters] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [showLetterButton, setShowLetterButton] = useState("Show Letter");
  const [failureMessage, setFailureMessage] = useState("");

  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  // Component to display gifs
  const GiphysResponse = (props) => {
    const items = props.gifs.map((element) => {
      return (
        <div className="gify-display div" key={element.id}>
          <img src={element.url} alt="gifs" />
        </div>
      );
    });

    return <div>{items}</div>;
  };

  // Fetch and display gifs for a letter
  const giphyImage = async (letter) => {
    console.log(letter);
    try {
      const response = await gf.animate(letter, { limit: 1 });

      setResults(response.data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
      setResults([]);
    }
  };
  // Speak a letter using the speech synthesis API
  const speakWord = (letter) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(letter);
    speechSynthesis.speak(utterance);
  };
  // Start sound recognition
  const startSoundRecognition = () => {
    if (recognitionInstance) {
      recognitionInstance.start();
    }
  };

  //Set up speech recognition
  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    const grammar = new window.webkitSpeechGrammarList();

    grammar.addFromString(letters.join("  "), 1);
    recognition.grammars = grammar;

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      console.log(event.results);
      const letter = event.results[0][0].transcript.toUpperCase();
      console.log(letter);
      setUserSound(letter);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    setRecognitionInstance(recognition);

    return () => {
      if (recognitionInstance) {
        recognition.stop();
      }
    };
  }, []);
  //Generate sound
  const soundGenerator = (letter) => {
    giphyImage(letter);
    speakWord(letter);
    speakWord(letter);
  };
  //Triggers the soundGenerator function
  useEffect(() => {
    if (userSound.length <= 2 && letters.includes(userSound.charAt(0))) {
      soundGenerator(userSound.charAt(0));
      setFailureMessage("");
    } else {
      setFailureMessage("Try Again. Click the start button.");
    }
  }, [userSound]);

  // Show next letter and associated gifs
  const showNextLetter = () => {
    if (currentLetterIndex < letters.length) {
      const letter = letters[currentLetterIndex];
      soundGenerator(letter);
      setShowLetters(true);
      setCurrentLetterIndex(currentLetterIndex + 1);
    }
  };
  // Handle the show letter button click
  const showLetterHandler = () => {
    if (showLetterButton === "Show Letter") {
      showNextLetter();
      setShowLetterButton("Stop Listening");
    } else {
      recognitionInstance.stop();
      setShowLetterButton("Show Letter");
      setShowLetters(false);
      giphyImage("");
    }
  };
  // timer to move to the next letter
  useEffect(() => {
    if (showLetters) {
      const timeOut = setTimeout(() => {
        setShowLetters(false);
        if (currentLetterIndex < letters.length) {
          showNextLetter();
        }
      }, 3000);
      return () => clearTimeout(timeOut);
    }
  }, [showLetters, currentLetterIndex]);

  return (
    <Box
      width="100%"
      p={{ base: 2, md: 4 }}
      pr={{ base: 0, md: 0 }}
      ml={{ base: 0, md: 10 }}
    >
      <Tabs className="tab-container">
        <TabList
          style={{
            flexWrap: "wrap",
            justifyContent: "center",
            color: "white",
            backgroundColor: "#B8860B",
          }}
          mb={{ base: 4, md: 6 }}
          maxW={{ base: "90%", md: "85%" }}
          ml={{ base: 2.5, md: 10 }}
        >
          <Tab>Learn All Letters</Tab>
          <Tab>Learn the Sound</Tab>
          <Tab>Practice the Sound</Tab>
          <Tab>Test Yourselves</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box
              width="80%"
              textAlign="left"
              pl={{ base: 1, md: 6 }}
              mx={{ base: 0, md: 2 }}
            >
              <h3 style={{ color: "gold", fontSize: "40px" }}>Welcome!</h3>
              <div style={{ color: "white" }}>
                <p>
                  Your first step begins here to be a G.R.O.A.T GOAT (Greatest
                  Reader Of All Time)
                </p>
                <p>
                  Learn the letters, and you can also press each letter to
                  listen to its sound
                </p>
              </div>

              <Flex justifyContent={"center"}>
                <div>
                  <AllLettersInOne letters={letters} onClick={soundGenerator} />
                </div>
              </Flex>
            </Box>
          </TabPanel>

          <TabPanel className="each-tabPanel">
            <Box
              width="80%"
              textAlign="left"
              pl={{ base: 1, md: 6 }}
              mx={{ base: 0, md: 2 }}
            >
              <h5 style={{ color: "gold", fontSize: "40px" }}>Welcome! </h5>
              <p style={{ color: "white" }}>
                {" "}
                Here you are going to learn the sound of all letters in just one
                click{" "}
              </p>
              <Flex justifyContent={"center"}>
                <CustomButton
                  className="start-stop-button"
                  onClick={showLetterHandler}
                >
                  {showLetterButton}
                </CustomButton>
              </Flex>
              <Flex justifyContent={"center"}>
                <div>
                  {showLetters && (
                    <div>
                      <div key={letters[currentLetterIndex - 1]}>
                        {results.length > 0 && (
                          <GiphysResponse gifs={results} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Flex>
            </Box>
          </TabPanel>

          <TabPanel className="each-tabPanel">
            <Box
              width="80%"
              textAlign="left"
              pl={{ base: 1, md: 6 }}
              mx={{ base: 0, md: 2 }}
            >
              <div>
                <h2 style={{ color: "gold", fontSize: "36px" }}>
                  Voice Command Practice
                </h2>
                <div style={{ color: "white" }}>
                  <p>
                    Get closer to the microphone, click the start button, and
                    say a random letter.
                  </p>
                  <p>You will hear a sound back...</p>
                </div>
              </div>

              <Flex justifyContent={"center"}>
                <CustomButton
                  className="start-stop-button"
                  onClick={startSoundRecognition}
                >
                  {" "}
                  Start Practice
                </CustomButton>
              </Flex>
              <Flex justifyContent={"center"}>
                <div>
                  {userSound && failureMessage && <p>{failureMessage}</p>}
                  {results.length > 0 && <GiphysResponse gifs={results} />}
                </div>
              </Flex>
            </Box>
          </TabPanel>

          <TabPanel className="each-tabPanel">
            <Box
              width="80%"
              textAlign="left"
              pl={{ base: 1, md: 6 }}
              mx={{ base: 0, md: 2 }}
            >
              <Flex justifyContent={"center"}>
                <LetterGame letters={letters} />
              </Flex>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
