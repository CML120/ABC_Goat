import React, { useState, useEffect } from "react";
import annyang from "annyang";
import { GiphyFetch } from "@giphy/js-fetch-api";
import "./PlayGround.css";
import WordGuessGame from "./WordGuessGame";
import { motion } from "framer-motion";

const giphyFetch = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY);

function PlayGround() {
    const [spokenWord, setSpokenWord] = useState("");
    const [gifUrl, setGifUrl] = useState("");
    const [listening, setListening] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);
    const [rotationKey, setRotationKey] = useState(0);

    // Function to start listening for speech input
    const handleStartListening = () => {
        setListening(true);
        setShowInstructions(false);
    };

    // Function to stop listening for speech input
    const handleStopListening = () => {
        setListening(false);
    };

    useEffect(() => {
        // Callback function to handle recognized speech
        const handleSpeech = async (phrases) => {
            if (phrases && phrases.length > 0) {
                const spoken = phrases[0];
                setSpokenWord(spoken);
                await fetchGiphyImage(spoken);
            }
        };

        if (listening) {
            // Add callback for speech recognition and start listening
            annyang.addCallback("result", handleSpeech);
            annyang.start();
        } else {
            // Remove callback and stop listening
            annyang.removeCallback("result", handleSpeech);
            annyang.abort();
        }

        // Clean up when component unmounts or listening changes
        return () => {
            annyang.removeCallback("result", handleSpeech);
            annyang.abort();
        };
    }, [listening]);

    // Function to fetch a Giphy image based on the spoken word
    const fetchGiphyImage = async (word) => {
        try {
            const { data } = await giphyFetch.random({ tag: word });
            console.log("Giphy API Response:", data);
            if (data && data.images.original.url) {
                // Update the GIF URL and rotation key to trigger animation
                setGifUrl(data.images.original.url);
                setRotationKey(rotationKey + 1);
            }
        } catch (error) {
            console.error("Error fetching Giphy data:", error);
        }
    };

    return (
        <div className="playground-container">
            <div className="speech-recognition-container">
                {showInstructions && (
                    <p className="instruction-text">
                        Click the button below and say a word. Watch for the magic to happen!
                    </p>
                )}
                {listening ? (
                    <button className="start-stop-button" onClick={handleStopListening}>
                        Click Me to Stop Listening!
                    </button>
                ) : (
                    <button className="start-stop-button" onClick={handleStartListening}>
                        Click Me to Start Listening!
                    </button>
                )}
            </div>
            <p className="spoken-word-PG">What you said: {spokenWord}</p>
            {gifUrl && (
                <motion.div
                    key={rotationKey}
                    className="gif-container-PG"
                    initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                >
                    <img src={gifUrl} alt="Giphy" className="gif-image" />
                </motion.div>
            )}

            <div className="word-guess-game-container">
                <WordGuessGame />
            </div>
        </div>
    );
}

export default PlayGround;
