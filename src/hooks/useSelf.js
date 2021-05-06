import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SELF_INFO, GET_SELF_ROOMS } from '../helpers/api';

const useSelf = () => {
  const [selfInfo, setSelfInfo] = useState({
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    profilePic: '',
    role: '',
  });
  const [rooms, setRooms] = useState([]);
  const { loading: loadingQueryInfo, data: dataQueryInfo } = useQuery(
    GET_SELF_INFO
  );
  const { loading: loadingQueryRooms, data: dataQueryRooms } = useQuery(
    GET_SELF_ROOMS
  );

  useEffect(() => {
    if (!loadingQueryInfo) {
      const { user } = dataQueryInfo;
      setSelfInfo(user);
    }
  }, [loadingQueryInfo, dataQueryInfo]);

  useEffect(() => {
    if (!loadingQueryRooms) {
      const { rooms: userRooms } = dataQueryRooms.usersRooms;
      setRooms(userRooms);
    }
  }, [loadingQueryRooms, dataQueryRooms]);

  return { selfInfo, rooms };
};

export default useSelf;
