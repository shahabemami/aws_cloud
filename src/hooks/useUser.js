import { useState, useEffect } from 'react';

import { Auth } from 'aws-amplify';

const useUser = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    let mounted = true;
    
    const calls = () => {
      Auth.currentAuthenticatedUser()
        .then((user) => setUser(user))
        .catch(() => {});
    };

    if (mounted) calls();

    return () => {
      mounted = false;
    };
  }, []);

  return user;
};

export default useUser;
