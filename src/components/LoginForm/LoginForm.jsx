import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// react-hook-form
import { useForm } from 'react-hook-form';

// components
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    minWidth: 400,
  },
}));

const LoginForm = () => {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column">
          <Box marginBottom={5} width="100%">
            <TextField
              fullWidth
              variant="outlined"
              label="email"
              name="email"
              inputRef={register({ required: {value: true, message: "this field is required"} })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Box>

          <Box marginBottom={5} width="100%">
            <TextField
              fullWidth
              variant="outlined"
              label="password"
              name="password"
              inputRef={register({ required: {value: true, message: "this field is required"} })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Box>
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default LoginForm;
