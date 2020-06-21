import React from "react";

// react-hook-form
import { useForm } from "react-hook-form";

// components
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();

  const onLogin = (data) => {
    console.log(data);
  };

  const onSignup = (data) => {
    console.log(data);
  };

  return (
    <Box>
      {/* start login form */}
      <form onSubmit={handleSubmit(onLogin)}>
        <Box display="flex" flexDirection="column">
          <TextField name="email" inputRef={register({ required: true })} />
          <TextField name="password" inputRef={register({ required: true })} />

          <Button type="submit" variant="contained">
            Login
          </Button>
        </Box>
      </form>
      {/* end login form */}

      <Box width="100%" height={350}></Box>

      {/* start signup form */}
      <form onSubmit={handleSubmit(onSignup)}>
        <Box display="flex" flexDirection="column">
          <TextField name="email" inputRef={register({ required: true })} />
          <TextField name="password" inputRef={register({ required: true })} />

          <Button type="submit" variant="contained">
            Signup
          </Button>
        </Box>
      </form>
      {/* end signup form */}
    </Box>
  );
};

export default LoginPage;
