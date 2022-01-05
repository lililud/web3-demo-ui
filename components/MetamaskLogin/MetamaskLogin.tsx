import { useMoralis } from 'react-moralis';
import { useEffect} from 'react';
import { Button } from '@mui/material';
const MetamaskLogin = () => {
  const {
    isWeb3Enabled,
    isAuthenticated,
    enableWeb3,
    authenticate,
    logout,
    isAuthenticating,
    isWeb3EnableLoading,
  } = useMoralis();
  const isLoading = isAuthenticating || isWeb3EnableLoading;
  const isLoggedIn = isAuthenticated;
  const enableAndAuthenticate = async () => {
    await enableWeb3();
    await authenticate();
  };
  const signInOrSignOut = () => {
    if (!isWeb3Enabled || !isAuthenticated) {
      enableAndAuthenticate();
    } else {
      logout();
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      enableWeb3();
    }
  }, [isAuthenticated, enableWeb3]);



  return (

    <Button
      disabled={isAuthenticating}
      onClick={signInOrSignOut}
      variant={"outlined"}
      color={"secondary"}
    >
      {isLoading
        ? 'Loading...'
        : isLoggedIn
        ? 'Disconnect'
        : 'Connect and Log In'}
    </Button>
  );
};
export default MetamaskLogin;
