import React, { useState, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// aws-amplify
import { Storage } from 'aws-amplify';

// actions
import { fetchAllFiles } from '../../actions/fileActions';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import ProgressButton from '../ProgressButton';

// styles
const useStyles = makeStyles((theme) => ({}));

const ShareModal = ({ open, onClose, file, level }) => {
  const classes = useStyles();

  const [useExpire, setUseExpire] = useState(false);
  const [expire, setExpire] = useState(100);

  // states
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    setUseExpire(event.target.checked);
  };

  const onUpload = () => {
    const options = { level };
    if (useExpire) options.expires = expire * 1000;

    setIsLoading(true);
    Storage.get(file, { ...options })
      .then((file) => {
        navigator.clipboard.writeText(file);
        enqueueSnackbar('shared link copied to the clipboard', { variant: 'info' });
        setIsLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
        setIsLoading(false);
      });
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose} disableBackdropClick={isLoading}>
      <DialogTitle>Generate Link</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column">
          <Box marginBottom={2}>
            <FormControlLabel
              control={<Switch checked={useExpire} onChange={handleChange} name="useExpire" color="primary" />}
              label="Set Expire"
            />
          </Box>

          {useExpire && (
            <TextField
              label="Expires In (seconds)"
              type="number"
              value={expire}
              onChange={(event) => setExpire(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Close
        </Button>
        <ProgressButton onClick={onUpload} variant="outlined" color="primary" autoFocus isLoading={isLoading}>
          Generate
        </ProgressButton>
      </DialogActions>
    </Dialog>
  );
};

export default ShareModal;
