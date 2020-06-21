// aws-amplify
import { Storage } from 'aws-amplify';

// types
import types from '../actionTypes/fileTypes';

const setFilesLoading = (loading) => ({
  type: types.SET_FILES_LOADING,
  loading,
});

const setFiles = (files) => ({
  type: types.SET_FILES,
  files,
});

const fetchAllFiles = (path, level) => {
  return (dispatch) => {
    dispatch(setFilesLoading(true));
    Storage.list(path, { level })
      .then((files) => {
        dispatch(setFiles(files));
        dispatch(setFilesLoading(false));
      })
      .catch((error) => dispatch(setFilesLoading(false)));
  };
};

export { fetchAllFiles };
