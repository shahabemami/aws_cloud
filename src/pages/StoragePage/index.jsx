import React from 'react';

// aws-amplify
import { Auth } from 'aws-amplify';

// react-router-dom
import { useHistory } from 'react-router-dom';

const StoragePage = () => {
  const history = useHistory();

  return (
    <div>
      <h1
        onClick={() =>
          Auth.signOut().then((user) => {
            history.replace('/auth');
          })
        }
      >
        hello
      </h1>
    </div>
  );
};

export default StoragePage;
