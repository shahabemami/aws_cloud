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
  compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
