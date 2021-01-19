import { Navigation } from 'react-native-navigation';
import regterScreens from './screens';
import { AppNavigation } from './common';
import appLaunchConfig from './utils/AppLaunchConfig';
import SplashScreen from 'react-native-splash-screen';
import Location from './utils/Location';

export default () => {
  Navigation.events().registerAppLaunchedListener(async () => {
    await Location.configure();
    AppNavigation.setNavigationDefaultOptions();
    SplashScreen.hide();
    regterScreens();
    await appLaunchConfig();
    AppNavigation.navigateToHome();
  });
};
