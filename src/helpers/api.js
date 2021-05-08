import { gql } from '@apollo/client';

export const GET_SELF_INFO = gql`
  query GetSelfInfo {
    user {
      id
      email
      firstName
      lastName
      profilePic
      role
    }
  }
`;
export const GET_SELF_ROOMS = gql`
  query GetSelfRooms {
    usersRooms {
      rooms {
        id
        name
        roomPic
      }
    }
  }
`;
export const GET_ROOM_INFO = gql`
  query GetRoomInfo($roomID: ID!) {
    room(id: $roomID) {
      id
      name
      roomPic
    }
  }
`;
export const GET_MESSAGES = gql`
  query GetMessages($roomID: ID!) {
    room(id: $roomID) {
      id
      messages {
        id
        body
        insertedAt
        user {
          id
          profilePic
        }
      }
    }
  }
`;
export const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription OnMessageSent($roomID: String!) {
    messageAdded(roomId: $roomID) {
      id
      body
      insertedAt
      user {
        id
        profilePic
      }
    }
  }
`;
export const MESSAGE_TYPING_SUBSCRIPTION = gql`
  subscription OnMessageTyping($roomID: String!) {
    typingUser(roomId: $roomID) {
      id
      firstName
      profilePic
    }
  }
`;
export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($roomID: String!, $body: String!) {
    sendMessage(roomId: $roomID, body: $body) {
      id
    }
  }
`;
export const TYPING_MESSAGE_MUTATION = gql`
  mutation TypingMessage($roomID: String!) {
    typingUser(roomId: $roomID) {
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    registerUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      id
      email
    }
  }
`;
