import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// actions
import { fetchAllFiles } from '../../actions/fileActions';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// aws-amplify
import { Storage } from 'aws-amplify';

// notistack
import { useSnackbar } from 'notistack';

// components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ShareModal from '../ShareModal';

// icons
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';

// styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
    alignItems: 'center',
  },
}));

const File = ({ name, level, fetchAllFiles }) => {
  const classes = useStyles();

  const [openShareModal, setOpenShareModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const onDelete = () => {
    setIsLoading(true);
    Storage.remove(name, { level })
      .then(() => {
        fetchAllFiles('', 'protected');
        setIsLoading(false);
        enqueueSnackbar(`${name} removed`, { variant: 'info' });
      })
      .catch((error) => {
        setIsLoading(false);
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };

  return (
    <Paper className={classes.root}>
      <Box flex={1}>
        <Typography>{name}</Typography>
      </Box>

      <Box display="flex">
        <IconButton onClick={onDelete} disabled={isLoading}>
          <DeleteIcon />
        </IconButton>

        <IconButton disabled={isLoading} onClick={() => setOpenShareModal(true)}>
          <ShareIcon />
        </IconButton>
      </Box>

      <ShareModal open={openShareModal} onClose={() => setOpenShareModal(false)} file={name} level="protected" />
    </Paper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchAllFiles,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(File);
