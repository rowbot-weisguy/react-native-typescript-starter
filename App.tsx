import {
  ConnectWallet,
  magicWallet,
  metamaskWallet,
  rainbowWallet,
  ThirdwebProvider,
  trustWallet,
  useAddress,
  useDisconnect,
  useLogin,
  useLogout,
  useUser,
} from '@thirdweb-dev/react-native';
import React from 'react';
import {Button, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  /**
   * ThirdwebProvider implicitly wraps the app in a SafeAreaView
   * */
  return (
    <ThirdwebProvider
      activeChain="localhost"
      authConfig={{
        domain: 'http://localhost:3000',
        authUrl: 'http://localhost:4300/api/auth',
      }}
      supportedWallets={[
        magicWallet({apiKey: 'pk_live_2295D51243E4AFB1'}),
        metamaskWallet(),
        rainbowWallet(),
        trustWallet(),
      ]}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  const address = useAddress();
  const {login} = useLogin();
  const {logout} = useLogout();
  const disconnect = useDisconnect();
  const {user, isLoggedIn} = useUser();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textStyles = {
    color: isDarkMode ? Colors.white : Colors.black,
    ...styles.heading,
  };

  const handleDisconnect = async () => {
    await disconnect();
    console.log('disconnected wallet');
  };

  const handleLogin = async () => {
    const token = await login();
    console.log('logged in, token', token);
  };

  const handleLogout = async () => {
    await logout();
    console.log('logged out');
  };

  return (
    <View style={backgroundStyle}>
      <View style={styles.view}>
        <Text style={textStyles}>React Native thirdweb starter</Text>
        <ConnectWallet />
        {address && <Button onPress={handleDisconnect} title="Disconnect" />}
        {address && !isLoggedIn && (
          <Button onPress={handleLogin} title="Login" />
        )}
        {isLoggedIn && (
          <>
            <Text>User: {JSON.stringify(user?.data)}</Text>
            <Button onPress={handleLogout} title="Logout" />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
