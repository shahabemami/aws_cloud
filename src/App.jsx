import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

// actions
import { getUser } from './actions/authActions';

// redux
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// helpers
import store from './helpers/store';

// react-router-dom
import { Route, BrowserRouter } from 'react-router-dom';

// themes
import theme from './theme';

// notistack
import { SnackbarProvider } from 'notistack';

// pages
import AuthPage from './pages/AuthPage';
import StoragePage from './pages/StoragePage';

// components
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from './components/PrivateRoute';

// aws config
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const ConnectedApp = ({ user, getUser }) => {
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box width="100%" height="100%">
      <CssBaseline />

      <PrivateRoute exact path="/" component={StoragePage} isAuthenticated={!!user} />
      <Route path="/auth" component={AuthPage} />
    </Box>
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUser,
    },
    dispatch
  );
};

const Routes = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <Routes />
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
