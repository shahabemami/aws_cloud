// types
import types from '../actionTypes/authTypes';

const authReducer = (state = null, action) => {
  switch (action.type) {
    case types.SET_USER:
      return action.user;
    default:
      return state;
  }
};

export default authReducer;
