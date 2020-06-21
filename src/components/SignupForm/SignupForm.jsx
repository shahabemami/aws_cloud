import React, { useState, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// constants
import { EMAIL_REGEX } from '../../constants';

// aws-amplify
import { Auth } from 'aws-amplify';

// react-hook-form
import { useForm } from 'react-hook-form';

// react-router-dom
import { useHistory } from 'react-router-dom';

// notistack
import { useSnackbar } from 'notistack';

// components
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import ProgressButton from '../ProgressButton';

// styles
const useStyles = makeStyles((theme) => ({
  root: {},
}));

const SignupForm = ({ onCompleted, onError }) => {
  const classes = useStyles();

  // states
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const { register, handleSubmit, errors } = useForm();

  const history = useHistory();

  const onSubmit = ({ email, password }) => {
    setIsLoading(true);

    Auth.configure();

    Auth.signUp(email, password)
      .then((user) => {
        onCompleted && onCompleted(user, { email, password });
        enqueueSnackbar('User successfully created');

        history.replace('/');

        setIsLoading(false);
      })
      .catch((error) => {
        onError && onError(error, { email, password });

        enqueueSnackbar(error.message, { variant: 'error' });

        setIsLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column">
        <Box marginBottom={5} width="100%">
          <TextField
            fullWidth
            variant="outlined"
            label="email"
            name="email"
            inputRef={register({
              required: { value: true, message: 'this field is required' },
              pattern: { value: EMAIL_REGEX, message: 'not a valid email address' },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>

        <Box marginBottom={5} width="100%">
          <TextField
            fullWidth
            type="password"
            variant="outlined"
            label="password"
            name="password"
            inputRef={register({ required: { value: true, message: 'this field is required' } })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>
        <ProgressButton isLoading={isLoading} fullWidth type="submit" variant="contained">
          Signup
        </ProgressButton>
      </Box>
    </form>
  );
};

export default memo(SignupForm);
