import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// react-hook-form
import { useForm } from "react-hook-form";

// components
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const SignupForm = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column">
          <TextField name="email" inputRef={register({ required: true })} />
          <TextField name="password" inputRef={register({ required: true })} />

          <Button type="submit" variant="contained">
            Signup
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default SignupForm;
