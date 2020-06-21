import { useState, useEffect } from 'react';

// notistack
import { useSnackbar } from 'notistack';

// aws-amplify
import { Storage } from 'aws-amplify';

const useFiles = (path, options) => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let mounted = true;

    const calls = () => {
      setIsLoading(true);
      Storage.list(path, options)
        .then((files) => {
          setFiles(files);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    if (mounted) calls();

    return () => {
      mounted = false;
    };
  }, []);

  return { files, isLoading };
};

export default useFiles;
