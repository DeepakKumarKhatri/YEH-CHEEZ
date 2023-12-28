/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MyApp from './MyApp';
import Login from './src/auth/Login';
import SignUp from './src/auth/SignUp';
AppRegistry.registerComponent(appName, () => App);
