import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// actions
import { fetchAllFiles } from '../../actions/fileActions';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


// components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import LinearProgress from '@material-ui/core/LinearProgress';
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
  progress: {
    width: "100%",
    height: '3px',
  }
}));

const StoragePage = ({ files, fetchAllFiles }) => {
  const classes = useStyles();

  const [openFileModal, setOpenFileModal] = useState(false);

  const renderFiles = () => {
    return files.result.map((file, index) => <FileItem key={index} name={file.key} level="protected" />);
  };

  useEffect(() => {
    let mounted = true;

    const calls = () => {
      fetchAllFiles('', 'protected');
    };

    if (mounted) calls();

    return () => {
      mounted = false;
    };
  }, []);
  return (
    <Box width="100%" height="100%" position="relative">
      <AppBar color="transparent" variant="outlined" position="relative">
        <Toolbar>
          <SignOutButton />
        </Toolbar>
      </AppBar>
      {files.loading && <LinearProgress className={classes.progress}/>}

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

const mapStateToProps = ({ files }) => ({
  files,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchAllFiles,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StoragePage);
