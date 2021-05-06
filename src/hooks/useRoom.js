import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ROOM_INFO } from '../helpers/api';

const useRoom = (roomID) => {
  const [room, setRoom] = useState({ id: '', name: '', roomPic: '' });
  const { loading: loadingQuery, data: dataQuery } = useQuery(GET_ROOM_INFO, {
    variables: { roomID },
  });

  useEffect(() => {
    if (!loadingQuery) {
      const { room: roomInfo } = dataQuery;
      setRoom(roomInfo);
    }
  }, [loadingQuery, dataQuery]);
  return {
    room,
  };
};

export default useRoom;
