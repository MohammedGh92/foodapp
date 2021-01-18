import {AppState, Linking} from 'react-native';
import store from '../store/store';
import {setLocationPermessionsStatus, setGpsStatus} from '../actions/location';
import RNLocation from 'react-native-location';
import GPSState from 'react-native-gps-state';
const permissions = {
  ios: 'whenInUse',
  android: {
    detail: 'fine',
  },
};
const configurations = {
  distanceFilter: 5.0,
  desiredAccuracy: {
    ios: 'best',
    android: 'highAccuracy',
  },
};
export default class Location {
  static granted = false;
  static configure = async () => {
    try {
      await Location.requestPermission();
      await RNLocation.configure(configurations);
    } catch (error) {
      console.log(error);
    } finally {
      this.onConfigure();
    }
  };
  static requestPermission = async () => {
    this.granted = await RNLocation.checkPermission(permissions);
    if (!this.granted) {
      this.granted = await RNLocation.requestPermission(permissions);
    }
  };
  static onConfigure = async () => {
    Location.locationPermissionListener();
    AppState.addEventListener('change', (evt) => {
      if (evt === 'active') {
        Location.locationPermissionListener();
        GPSState.getStatus().then((status) => {
          this.gpsPermessionListener(status);
        });
      }
    });
    GPSState.getStatus().then((status) => {
      this.gpsPermessionListener(status);
    });
    GPSState.addListener(this.gpsPermessionListener);
  };
  static openLocationSettings = () => {
    !store.getState().location.IsLocationOn
      ? Linking.openSettings()
      : GPSState.openLocationSettings();
  };

  static subscribeToPermissionUpdates = RNLocation.subscribeToPermissionUpdates(
    (currentPermission) => {
      console.log(permissions);
    },
  );

  static gpsPermessionListener = (status) => {
    if (
      status === GPSState.AUTHORIZED_ALWAYS ||
      status === GPSState.AUTHORIZED_WHENINUSE
    ) {
      console.log('set true', status, 'GPS status');
      store.dispatch(setGpsStatus(true));
    } else {
      console.log('set false', status, 'GPS status');
      store.dispatch(setGpsStatus(false));
    }
  };
  static locationPermissionListener = async () => {
    try {
      this.granted = await RNLocation.checkPermission(permissions);
      console.log('Checking Location....', this.granted);
      store.dispatch(setLocationPermessionsStatus(this.granted));
    } catch (error) {
      console.log(error);
    }
  };

  static getLatestLocation = (locationChangeCallback) => {
    RNLocation.getLatestLocation({timeout: 60000}).then((latestLocation) => {
      // Use the location here
      if (latestLocation !== null) {
        locationChangeCallback(latestLocation);
      } else {
        this.getLatestLocation(locationChangeCallback);
      }
    });
  };
}
