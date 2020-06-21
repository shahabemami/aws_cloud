import React from "react";

// react-router-dom
import { BrowserRouter, Switch, Route } from "react-router-dom";

// pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// components
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";

const App = () => {
  return (
    <BrowserRouter>
      <Box>
        <CssBaseline />

        <Switch>
          <Route exact path="/" component={LoginPage} />
        </Switch>
      </Box>
    </BrowserRouter>
  );
};

export default App;
