import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SELF_INFO } from '../helpers/api';

const useSelf = () => {
  const [selfInfo, setSelfInfo] = useState({
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    profilePic: '',
    role: '',
  });
  const { loading: loadingQuery, data: dataQuery } = useQuery(GET_SELF_INFO);

  useEffect(() => {
    if (!loadingQuery) {
      const { user } = dataQuery;
      setSelfInfo(user);
    }
  }, [loadingQuery, dataQuery]);
  return selfInfo;
};

export default useSelf;
