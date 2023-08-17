import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../utils/mutations";
import "./Signup.css";
import Auth from "../../utils/auth";
import {
  Input,
  Button,
  Container,
  Box,
  Flex,
  Center,
  VStack,
  Spacer,
} from "@chakra-ui/react";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...formState },
      });
      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main id="signupForm" className="" style={{ marginTop: "-150px" }}>
      <Flex align="center" justify="center" height="100vh">
        <Container>
          <VStack spacing="1vh">
            <Box>
              <h1 className="">Sign Up</h1>
            </Box>
          </VStack>
          <VStack spacing="1vh">
            <Box>
              {data ? (
                <Box>
                  Success! You may now head{" "}
                  <Link to="/">back to the homepage.</Link>
                </Box>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <Box mb="4">
                    <label htmlFor="Input1" className="form-label">
                      Username:{" "}
                    </label>
                    <Input
                      size="md"
                      fontSize="md" // Adjust font size here
                      className=""
                      placeholder="Your username"
                      name="username"
                      type="text"
                      value={formState.username}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box mb="4">
                    <label htmlFor="Input2" className="form-label">
                      Email:{" "}
                    </label>
                    <Input
                      size="md"
                      fontSize="md" // Adjust font size here
                      className=""
                      placeholder="Your email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box mb="4">
                    <label htmlFor="Input3" className="form-label">
                      Password:{" "}
                    </label>
                    <Input
                      size="md"
                      fontSize="md" // Adjust font size here
                      className=""
                      placeholder="******"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                  </Box>
                  <Center>
                    <Button
                      size="md"
                      borderRadius="md"
                      bg="black"
                      color="white"
                      className=""
                      style={{ cursor: "pointer" }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Center>
                </form>
              )}

              {error && <Box maxW="600px">{error.message}</Box>}
            </Box>
          </VStack>
        </Container>
      </Flex>
    </main>
  );
};

export default Signup;
