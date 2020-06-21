// aws-amplify
import { Auth } from 'aws-amplify';

// types
import types from '../actionTypes/authTypes';

const setUser = (user) => ({
  type: types.SET_USER,
  user,
});

const getUser = () => {
  return (dispatch) => {
    Auth.currentAuthenticatedUser()
      .then((user) => dispatch(setUser(user)))
      .catch((error) => {
        console.error(error);
      });
  };
};

const clearUser = () => {
  return (dispatch) => {
    dispatch(setUser(null));
  };
};

export { getUser, clearUser };
