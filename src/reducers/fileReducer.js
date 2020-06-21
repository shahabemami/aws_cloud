// types
import types from '../actionTypes/fileTypes';

const defaultState = {
  result: [],
  loading: false,
};

const fileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_FILES_LOADING:
      return { ...state, loading: action.loading };
    case types.SET_FILES:
      return { ...state, result: action.files };
    default:
      return state;
  }
};

export default fileReducer;
