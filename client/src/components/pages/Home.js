import React from "react";

import "./Home.css";
import { Container, Center, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container id="welcome-page">
      <Center>
        <VStack spacing="1vh">
          <h1 style={{ color: "gold", fontSize: "32px" }} id="welcome-header">
            Welcome to ABC GOAT!
          </h1>
          <h2 id="welcome-header-2">A learning app for kids ages 3 - 7</h2>
          <p>
            ABC GOAT is a learning app that teaches kids to read while playing
            games and having fun! Start in the Play Ground area where you can
            play a word guessing game as well as search for words you may not
            know how to spell. Just say the word you are thinking and it will
            pop up! There is also an area to practice your letters. It will take
            you through the alphabet and teach you the names of the letters and
            the order of the alphabet. When you are ready head on over to the
            Spelling Game and ask yourself, "Are you ready to achieve G.R.O.A.T.
            status?" G.R.O.A.T stands for Greatest reader of all time! See if
            you can spell all the words! Good luck!
          </p>
        </VStack>
      </Center>
    </Container>
  );
}
