import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// aws-amplify
import { Storage } from 'aws-amplify';

// notistack
import { useSnackbar } from 'notistack';

// components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

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

const File = ({ name, level }) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const onDelete = () => {
    Storage.remove(name, { level })
      .then(() => enqueueSnackbar(`${name} removed`, { variant: 'info' }))
      .catch((error) => enqueueSnackbar(error.message, { variant: 'error' }));
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

        <IconButton disabled={isLoading}>
          <ShareIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default File;
