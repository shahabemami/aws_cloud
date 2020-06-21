import React, { useState, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// aws-amplify
import { Storage } from 'aws-amplify';

// react-hook-form
import { useForm } from 'react-hook-form';

// notistack
import { useSnackbar } from 'notistack';

// material-ui-dropzone
import { DropzoneArea } from 'material-ui-dropzone';

// components
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import ProgressButton from '../ProgressButton';

// styles
const useStyles = makeStyles((theme) => ({}));

const AddFileModal = ({ open, onClose }) => {
  const classes = useStyles();

  const [files, setFiles] = useState([]);

  // states
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const onUpload = () => {
    if (files.length > 0) {
      // upload files
      Storage.put(files[0].name, files[0])
        .then((file) => {
          console.log(file);
          enqueueSnackbar('successfully uploaded', { variant: 'success' });
        })
        .catch((error) => enqueueSnackbar(error.message, { variant: 'error' }));
    } else {
      enqueueSnackbar('you need to select at least one file', { variant: 'warning' });
    }
  };

  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={onClose} disableBackdropClick={isLoading}>
      <DialogTitle>Add Files</DialogTitle>
      <DialogContent>
        <DropzoneArea clearOnUnmount onChange={(files) => setFiles(files)} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Close
        </Button>
        <ProgressButton onClick={onUpload} variant="outlined" color="primary" autoFocus isLoading={isLoading}>
          Upload
        </ProgressButton>
      </DialogActions>
    </Dialog>
  );
};

export default memo(AddFileModal);
