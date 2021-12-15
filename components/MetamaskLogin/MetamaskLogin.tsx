import { useMoralis } from 'react-moralis';
import { useEffect} from 'react';
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
  }, [isAuthenticated]);



  return (

    <button
      disabled={isAuthenticating}
      onClick={signInOrSignOut}
    >
      {isLoading
        ? 'Loading...'
        : isLoggedIn
        ? 'Disconnect'
        : 'Connect and Log In'}
    </button>
  );
};
export default MetamaskLogin;
