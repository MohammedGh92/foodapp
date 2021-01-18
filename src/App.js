import { Navigation } from 'react-native-navigation';
import regterScreens from './screens';
import { AppNavigation } from './common';
import appLaunchConfig from './utils/AppLaunchConfig';
import store from './store/store';

import Location from './utils/Location';
import { AuthRepo } from './repo';
import { setUserData } from './actions/auth';

const authRepo = new AuthRepo();
export default () => {
  Navigation.events().registerAppLaunchedListener(async () => {
    await Location.configure();
    AppNavigation.setNavigationDefaultOptions();
    regterScreens();
    const authRepo = new AuthRepo();
    const userData = await authRepo.checkPrincipalUser();
    console.log('UU', userData);
    await appLaunchConfig();
    if (userData)
      await authRepo.signIn(userData.Data);
    else
      AppNavigation.navigateToAuth();
  });
};
