import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { gql } from '@apollo/client/core';
import { useQuery } from '@apollo/client';
import ScreenContainer from '../components/ScreenContainer/ScreenContainer';
import RoomsList from '../components/RoomsList/RoomsList';

const ALL_ROOMS = gql`
  query GetRoomsName {
    usersRooms {
      rooms {
        id
        name
        roomPic
      }
    }
  }
`;

const Rooms = () => {
  const [allRooms, setAllRooms] = useState([]);
  const { loading, data } = useQuery(ALL_ROOMS);

  useEffect(() => {
    if (!loading) {
      setAllRooms(data.usersRooms.rooms);
    }
  }, [loading, data]);

  return (
    <ScreenContainer
      title="Rooms"
      buttons={[
        { iconName: 'search', handlePress: () => {} },
        { iconName: 'rooms', handlePress: () => {} },
      ]}
    >
      {loading ? <Text>Loading...</Text> : <RoomsList rooms={allRooms} />}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Rooms;
