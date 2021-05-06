import { gql } from '@apollo/client';

export const GET_ROOM_AND_MESSAGES = gql`
  query GetRoomInfoAndMessages($roomID: String!) {
    user {
      id
    }
    room(id: $roomID) {
      id
      name
      roomPic
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
