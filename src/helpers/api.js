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
export const MESSAGE_SUBSCRIPTION = gql`
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
export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($roomID: String!, $body: String!) {
    sendMessage(roomId: $roomID, body: $body) {
      id
    }
  }
`;
