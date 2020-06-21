import React, { useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// aws-amplify
import { Auth } from 'aws-amplify';

// react-router-dom
import { useHistory } from 'react-router-dom';

// hooks
import useFiles from '../../hooks/useFiles';

// components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import SignOutButton from '../../components/SignOutButton';
import AddFileModal from '../../components/AddFileModal';
import FileItem from '../../components/File';

// icons
import AddIcon from '@material-ui/icons/Add';

// styles
const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const StoragePage = () => {
  const classes = useStyles();

  const { files, isLoading } = useFiles('', { level: 'protected' });

  const [openFileModal, setOpenFileModal] = useState(false);

  const renderFiles = () => {
    return files.map((file, index) => <FileItem key={index} name={file.key} level="protected" />);
  };

  return (
    <Box width="100%" height="100%" position="relative">
      <AppBar color="transparent" variant="outlined" position="relative">
        <Toolbar>
          <SignOutButton />
        </Toolbar>
      </AppBar>

      <Box marginY={4}>
        <Container>{renderFiles()}</Container>
      </Box>

      <AddFileModal open={openFileModal} onClose={() => setOpenFileModal(false)} />

      <Fab className={classes.fab} color="primary" onClick={() => setOpenFileModal(true)}>
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default StoragePage;
