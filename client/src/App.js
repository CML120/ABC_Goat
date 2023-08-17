import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AppProvider } from "./context/AppContext";
import "./App.css";
import SpellingGame from "./components/SpellingGame";
import PracticeLetter from "./components/practiceLetter";
import Navbar from "./components/Navbar";
import GameScreen from "./components/GameScreen";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import Home from "./components/pages/Home";
import Footer from "./components/Footer";
import PlayGround from "./components/PlayGround";
import { Box } from "@chakra-ui/react";
import Contact from "./components/Contact";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider> {/* Wrap your app with the AppProvider */}
        <Router>
          <div>
            <Navbar />
            <div className="mainContainer">
              <div>
                <GameScreen />
              </div>
              <Box p={1} width="100%" mx={{ base: 0, md: 4 }} pr={{ base: 0, md: 0 }}>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/letters" element={<PracticeLetter />} />
                <Route path="/spellinggame" element={<SpellingGame />} />
                <Route path="/playground" element={<PlayGround />} />
                <Route path="/contact" element={<Contact />} />
                </Routes>
              </Box>
            </div>
            <Footer />
          </div>
        </Router>
      </AppProvider>
    </ApolloProvider>
  );
}