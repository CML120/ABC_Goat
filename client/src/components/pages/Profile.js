import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { DELETE_USER } from "../../utils/mutations";
import "./Profile.css";

import {
  Container,
  Flex,
  Text,
  VStack,
  Box,
  Center,
  Button,
} from "@chakra-ui/react";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [deleteUserById, { error }] = useMutation(DELETE_USER);
  const [deleteUser, setDeleteUser] = useState("");
  const [hideuser, setHideUser] = useState(false);
  // Retrieve user info from localStorage
  const userInfo = data?.me || {};

  const handleDeleteUser = async (userId) => {
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    try {
      const { data } = await deleteUserById({
        variables: { userId },
      });

      setDeleteUser("User has been deleted!");
      // deleteUserById({ id: userId });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!userInfo.username) {
    return (
      <Flex align="center" justify="center">
        <Center>
          <Container m={40}>
            <Box id="profile-error">You must be logged in!</Box>
          </Container>
        </Center>
      </Flex>
    );
  }
  return (
    <main style={{ marginTop: "100px" }}>
      <Flex align="center" justify="center">
        <Container>
          <VStack>
            <h1 id="profile-header">Profile</h1>
            {userInfo ? (
              <div>
                {!deleteUser && (
                  <p id="profile-p">Welcome {userInfo?.username}!</p>
                )}
                {/* <p id='profile-p'>Email: {userInfo?.email}</p> */}
                <p id="profile-p">Level: {userInfo?.level}</p>
                <Button
                  size="lg"
                  borderRadius="lg"
                  bg="black"
                  color="white"
                  className=""
                  style={{ cursor: "pointer" }}
                  type="submit"
                  onClick={() => handleDeleteUser(userInfo._id)}
                >
                  Delete User
                </Button>
                {deleteUser && <Text fontSize="16px">{deleteUser}</Text>}
              </div>
            ) : (
              <p>No user info available</p>
            )}
          </VStack>
        </Container>
      </Flex>
    </main>
  );
};

export default Profile;
