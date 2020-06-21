import React, { useState, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// constants
import { EMAIL_REGEX } from '../../constants';

// aws-amplify
import { Auth } from 'aws-amplify';

// react-hook-form
import { useForm } from 'react-hook-form';

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

const ConfrimForm = ({ email, onCompleted, onError }) => {
  const classes = useStyles();

  // states
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ code }) => {
    setIsLoading(true);

    Auth.confirmSignUp(email, code)
      .then((user) => {
        onCompleted && onCompleted(user, { email, code });

        enqueueSnackbar('Welcome!');

        setIsLoading(false);
      })
      .catch((error) => {
        onError && onError(error, { email, code });

        enqueueSnackbar(error.message, { variant: 'error' });

        setIsLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column">
        <Box marginBottom={5} width="100%">
          <TextField fullWidth variant="outlined" label="email" name="email" value={email} disabled inputRef={register} />
        </Box>
        <Box marginBottom={5} width="100%">
          <TextField
            fullWidth
            variant="outlined"
            label="Activation Code"
            name="code"
            inputRef={register({
              required: { value: true, message: 'this field is required' },
            })}
            error={!!errors.code}
            helperText={errors.email?.code}
          />
        </Box>
        <ProgressButton isLoading={isLoading} fullWidth type="submit" variant="contained">
          Confirm
        </ProgressButton>
      </Box>
    </form>
  );
};

export default memo(ConfrimForm);
