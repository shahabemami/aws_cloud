import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

// redux
import { Provider } from 'react-redux';

// helpers
import store from './helpers/store';

// react-router-dom
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// themes
import theme from './theme';

// hooks
import useUser from './hooks/useUser';

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

const App = () => {
  const user = useUser();
  return (
    <Box width="100%" height="100%">
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <CssBaseline />

              <Switch>
                <PrivateRoute exact path="/" component={StoragePage} isAuthenticated={!!user} />
                <Route exact path="/auth" component={AuthPage} />
              </Switch>
            </SnackbarProvider>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </Box>
  );
};

export default App;
