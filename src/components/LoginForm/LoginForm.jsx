import React from "react";

// react-hook-form
import { useForm } from "react-hook-form";

// components
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column">
        <TextField name="email" inputRef={register({ required: true })} />
        <TextField name="password" inputRef={register({ required: true })} />

        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
