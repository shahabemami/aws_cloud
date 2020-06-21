import { combineReducers } from 'redux';

// reducers
import fileReducer from './fileReducer';

const rootReducer = combineReducers({
  files: fileReducer,
});

export default rootReducer;
