import React from "react";

// react-router-dom
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/auth" />
      }
    />
  );
};

export default PrivateRoute;
