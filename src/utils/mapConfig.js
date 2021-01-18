import {
  aspectRatio,
  responsiveHeight,
  responsiveWidth,
} from '../common/utils/responsiveDimensions';
import {Platform} from 'react-native';
import {GOOGLE_KEY} from '../common/utils/Constants';
import store from '../store/store';
const toRad = (Value) => {
  return (Value * Math.PI) / 180;
};
const fitPaddingTop = Platform.OS === 'ios' ? 30 : 90;
export default class MapConfig {
  static LATITUDE_DELTA = 0.0122;
  static LONGITUDE_DELTA = MapConfig.LATITUDE_DELTA * aspectRatio();
  static SPACE = 0.01;
  static LOCATIONPH = {
    latitude: 24.685622684918172,
    longitude: 46.685698460787535,
  };
  static DEFAULT_REGION = {
    ...this.LOCATIONPH,
    latitudeDelta: this.LATITUDE_DELTA,
    longitudeDelta: this.LONGITUDE_DELTA,
  };
  static DEFAULT_PADDING = {
    top: responsiveHeight(22),
    right: 0,
    bottom: 0,
    left: 0,
  };
  static getPlaceName = (latitude, longitude) => {
    console.log(latitude, longitude);
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_KEY}&language=${
        store.getState().lang.lang
      }&sensor=true`,
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.status !== 'OK') {
          console.log('JSON-----', json);

          throw new Error(`Geocode error: ${json.status}`);
        }

        return json.results[0].formatted_address;
      });
    // .catch(error=>console.log("ERROR",error) )
  };

  static API_KEY = 'AIzaSyCoVBRCbQ4-8y5LCj_m5Nu4Y0ea1ZYrIXQ';

  static FIT_PADDING = {
    top: responsiveHeight(fitPaddingTop),
    right: 0,
    bottom: 0,
    left: 0,
  };

  static createMarker(LATITUDE, LONGITUDE, modifier) {
    return {
      latitude: LATITUDE,
      longitude: LONGITUDE,
    };
  }
  static calcCrow = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  };

  // Converts numeric degrees to radians

  static createRegion(lat, lng) {
    const region = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: MapConfig.LATITUDE_DELTA,
      longitudeDelta: MapConfig.LONGITUDE_DELTA,
    };
    return region;
  }

  static calculateDistance = ({
    longitudeDelta,
    latitudeDelta,
    longitude,
    mylatitude,
    latitude,
  }) => {
    const earth = {
      MILE: 3959,
      KM: 6371,
      M: 6371000,
      NMI: 3440,
    };

    const radiusEarth = earth.KM;
    const distance = Math.abs(
      (longitudeDelta / 360) * (Math.cos(latitude) * 2 * Math.PI * radiusEarth),
    );
    return distance;
  };
}
