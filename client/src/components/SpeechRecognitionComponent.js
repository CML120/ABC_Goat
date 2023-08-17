//Import dependencies
import React, { useState, useEffect } from 'react';
import annyang from 'annyang';

// SpeechRecognitionComponent to handle speech recognition
const SpeechRecognitionComponent = ({ handleSpokenWord }) => {
  // State variable to keep track of the listening status
  const [listening, setListening] = useState(false);

  // useEffect hook to initialize and configure annyang when the component mounts
  useEffect(() => {
    // Check if annyang is available
    if (annyang) {
      // Define speech recognition commands
      const commands = {
        '*word': (word) => handleSpokenWord(word), // When any word is recognized, call handleSpokenWord function with the recognized word.
      };
      
      // Add the defined commands to annyang
      annyang.addCommands(commands);
    }
  }, [handleSpokenWord]); // The effect depends on the handleSpokenWord function, so it will re-run if it changes.

  // Function to toggle the listening status
  const toggleListening = () => {
    if (listening) {
      // If listening, stop the speech recognition
      annyang.abort();
    } else {
      // If not listening, start the speech recognition
      annyang.start();
    }
    // Toggle the listening state
    setListening(!listening);
  };

  // JSX content for the SpeechRecognitionComponent
  return (
    <div>
      <button onClick={toggleListening}>
        {listening ? 'Stop Microphone' : 'Start Microphone'}
      </button>
    </div>
  );
};

export default SpeechRecognitionComponent;
