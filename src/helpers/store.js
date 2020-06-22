import { createStore, applyMiddleware, compose } from 'redux';

// redux-thunk
import thunk from 'redux-thunk';

// reducer
import rootReducer from '../reducers/index';

const initState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initState,
  compose(applyMiddleware(...middleware))
);

export default store;
