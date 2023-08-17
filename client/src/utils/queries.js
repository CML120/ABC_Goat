import { gql } from "@apollo/client";

export const QUERY_ME = gql`
query{
  me {
    _id
    username
    email
    level
  }
}
`;

export const QUERY_USER = gql`
  query QueryUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile($username: String!) { 
    getProfile(username: $username) {
      _id
      level
      username
      email
    }
  }
`;

export const FETCH_WORDS_BY_DIFFICULTY = gql`
  query FetchWordsByDifficulty($level: Int!) {
    getWordsByDifficulty(level: $level) {
      word
    }
  }
`;

export const FETCH_USER_NAME_BY_ID = gql`
  query FetchUserNameById($userId: ID!) {
    userById(id: $userId) {
      _id
      username
    }
  }
`;

export const UPDATE_PLAYER_LEVEL = gql`
  mutation UpdatePlayerLevel($userId: ID!, $newLevel: Int!) {
    updatePlayerLevel(userId: $userId, newLevel: $newLevel) {
      _id
      username
      email
      level
    }
  }
`;

export const FETCH_PLAYER_LEVEL = gql`
  query FetchPlayerLevel($userId: ID!) {
    userById(id: $userId) {
      _id
      level
    }
  }
`;

export const QUERY_USER_BY_EMAIL = gql`
  query QueryUserByEmail($email: String!) {
    userByEmail(email: $email) {
      _id
      username
      email
    }
  }
`;