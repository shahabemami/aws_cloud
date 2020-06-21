import React, { useState } from 'react';

// actions
import { clearUser } from '../../actions/authActions';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// react-router-dom
import { useHistory } from 'react-router-dom';

// aws-amplify
import { Auth } from 'aws-amplify';

// components
import ProgressButton from '../ProgressButton';

const SignOutButton = ({ clearUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const onClick = () => {
    setIsLoading(true);
    Auth.signOut()
      .then((user) => {
        clearUser();
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

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      clearUser,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOutButton);
