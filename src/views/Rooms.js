import React from 'react';
import ScreenContainer from '../components/ScreenContainer/ScreenContainer';
import RoomsList from '../components/RoomsList/RoomsList';
import useSelf from '../hooks/useSelf';
import { signOut } from '../helpers/util';
import Button from '../components/atoms/Button/Button';

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
        text="Logout"
        isSmall
        handlePress={() => {
          setIsLogged(false);
          signOut();
        }}
        style={{ margin: 16 }}
      />
    </ScreenContainer>
  );
};

export default Rooms;
