import React, { useState } from 'react';

// react-router-dom
import { useHistory } from 'react-router-dom';

// aws-amplify
import { Auth } from 'aws-amplify';

// components
import ProgressButton from '../ProgressButton';

const SignOutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const onClick = () => {
    setIsLoading(true);
    Auth.signOut()
      .then((user) => {
        setIsLoading(false);
        history.replace('/auth');
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <ProgressButton variant="contained" color="primary" onClick={onClick} isLoading={isLoading}>
      Signout
    </ProgressButton>
  );
};

export default SignOutButton;
