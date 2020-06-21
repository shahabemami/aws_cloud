import { useState, useEffect } from 'react';

import { Auth } from 'aws-amplify';

const useUser = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return user;
};

export default useUser;
