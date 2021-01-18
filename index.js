import {AppRegistry} from 'react-native';
import {I18nManager} from 'react-native';
import initApp from './src/App';
import {App } from "./App";
import {name as appName} from './app.json';

I18nManager.allowRTL(false);
console.disableYellowBox = true
AppRegistry.registerComponent(appName, () => App);
initApp();