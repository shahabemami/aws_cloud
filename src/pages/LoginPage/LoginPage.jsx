import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import LoginForm from "../../components/LoginForm";

const LoginPage = () => {
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Typography variant="h4" component="h4" align="left" gutterBottom>Login Form</Typography>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
