import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// react-router-dom
import { Redirect } from 'react-router-dom';

// hooks
import useUser from '../../hooks/useUser';

// react-router-dom
import { useHistory } from 'react-router-dom';

// components
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SignupForm from '../../components/SignupForm';
import LoginForm from '../../components/LoginForm';
import ConfrimForm from '../../components/ConfrimForm';
import { Auth } from 'aws-amplify';

// styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    minWidth: 400,
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  navigation: {
    cursor: 'pointer',
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
  },
}));

const AuthPage = () => {
  const classes = useStyles();

  const history = useHistory();

  const user = useUser();

  const [currentState, setCurrentState] = useState('login');
  const [email, setEmail] = useState('');

  // login form
  const onLoginCompleted = () => {
    setTimeout(() => {
      history.push('/');
    }, 500);
  };

  const onLoginError = (error, { email }) => {
    error.code === 'UserNotConfirmedException' && setCurrentState('confirm');
    setEmail(email);
  };

  // register form
  const onSignupCompleted = (user, { email }) => {
    console.log(user);
    setCurrentState('confirm');
    setEmail(email);
  };

  const getTitle = () => {
    switch (currentState) {
      case 'login':
        return 'Login';
      case 'confirm':
        return 'Confirm';
      case 'signup':
        return 'Signup';
      default:
        return 'Login';
    }
  };

  const renderNavigation = () => {
    switch (currentState) {
      case 'login':
        return (
          <Typography
            className={classes.navigation}
            onClick={() => {
              setCurrentState('signup');
            }}
          >
            Create account?
          </Typography>
        );
      case 'confirm':
        return (
          <Typography
            className={classes.navigation}
            onClick={() => {
              setCurrentState('login');
            }}
          >
            Back to Login
          </Typography>
        );
      case 'signup':
        return (
          <Typography
            className={classes.navigation}
            onClick={() => {
              setCurrentState('login');
            }}
          >
            Login instead?
          </Typography>
        );
      default:
        return (
          <Typography
            className={classes.navigation}
            onClick={() => {
              setCurrentState('signup');
            }}
          >
            Create account?
          </Typography>
        );
    }
  };

  const renderForm = () => {
    switch (currentState) {
      case 'login':
        return <LoginForm onError={onLoginError} onCompleted={onLoginCompleted} />;
      case 'confirm':
        return <ConfrimForm email={email} />;
      case 'signup':
        return <SignupForm onCompleted={onSignupCompleted} />;
      default:
        return <LoginForm onError={onLoginError} onCompleted={onLoginCompleted} />;
    }
  };

  if (!!user) return <Redirect to="/" />;

  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Paper className={classes.root}>
        <Typography variant="h4" gutterBottom>
          {getTitle()}
        </Typography>

        {renderForm()}
        {renderNavigation()}
      </Paper>
    </Box>
  );
};

export default AuthPage;
