import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import { QUERY_USER_BY_EMAIL } from '../../utils/queries';
import './Login.css';

import {
  Input,
  Button,
  Container,
  Box,
  Flex,
  Center,
  Stack,
  VStack,
  Spacer,
} from '@chakra-ui/react'

import Auth from '../../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  

  // Use the useQuery hook to fetch user details
  const { data: userData } = useQuery(QUERY_USER_BY_EMAIL, {
    variables: { email: formState.email },
    skip: !data?.login?.token, // Skip the query if token is not available
  });

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      const authToken = data?.login?.token;
      if (authToken) {
        Auth.login(authToken);
        
        // Fetch user details using the token
        if (userData?.userByEmail) {
          const { _id, username, email, level } = userData.userByEmail;
          console.log('User Details:', { _id, username, email, level });
        }
      }
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="" id='loginForm' style={{ marginTop: '-200px' }}>
      <Flex align="center" justify="center" height="100vh">
        <Container>
          <VStack spacing='1vh'>
            <Box>
              Login
            </Box>
          </VStack>
          <VStack spacing='1vh'>
            <Box>
              {data ? (
                <Box>
                  Success! You may now head to your {""}
                  <Link to="/profile">back to the homepage.</Link>
                </Box>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <Box mb="4">
                    <label htmlFor="Input1" className="form-label">Email: </label>
                    <Input
                      size="lg"
                      fontSize="xl" // Adjust font size here
                      className=""
                      placeholder="Your email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box mb="4">
                    <label htmlFor="Input2" className="form-label">Password: </label>
                    <Input
                      size="lg"
                      fontSize="xl" // Adjust font size here
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
                      size='lg'
                      borderRadius='lg'
                      bg='black'
                      color='white'
                      className=""
                      style={{ cursor: 'pointer' }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Center>
                </form>
              )}

              {error && (
                <div className="">
                  {error.message}
                </div>
              )}
            </Box>
          </VStack>
        </Container>
      </Flex>
    </main>
  );
};

export default Login;