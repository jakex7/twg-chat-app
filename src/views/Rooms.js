import React from 'react';
import ScreenContainer from '../components/ScreenContainer/ScreenContainer';
import RoomsList from '../components/RoomsList/RoomsList';
import useSelf from '../hooks/useSelf';

const Rooms = () => {
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
    </ScreenContainer>
  );
};

export default Rooms;
