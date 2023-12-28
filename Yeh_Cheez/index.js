/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MyApp from './MyApp';
import Login from './src/auth/Login';
import SignUp from './src/auth/SignUp';

import Banner from './src/components/atoms/Banner';
import Content from './src/components/organism/Content';
import Dashboard from './src/screens/Dashboard';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
    background: 'white',
    secondaryContainer: '#2D4990'
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
