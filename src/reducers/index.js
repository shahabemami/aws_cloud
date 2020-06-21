import { combineReducers } from 'redux';

// reducers
import fileReducer from './fileReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  user: authReducer,
  files: fileReducer,
});

export default rootReducer;
