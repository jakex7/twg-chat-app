import React from 'react';
import ScreenContainer from '../components/ScreenContainer/ScreenContainer';
import RoomsList from '../components/RoomsList/RoomsList';
import useSelf from '../hooks/useSelf';
import { signOut } from '../helpers/util';
import { Button } from 'react-native';

const Rooms = ({ setIsLogged }) => {
  const { rooms } = useSelf();

  return (
    <ScreenContainer
      title="Rooms"
      buttons={[
        { iconName: 'search', handlePress: () => {} },
        { iconName: 'rooms', handlePress: () => {} },
      ]}
    >
      <RoomsList rooms={rooms} />
      <Button
        title="Logout"
        onPress={() => {
          setIsLogged(false);
          signOut();
        }}
      />
    </ScreenContainer>
  );
};

export default Rooms;
