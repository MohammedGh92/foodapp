import React, {
  useMemo,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useCallback,
} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './styles';
import MapConfig from '../../utils/mapConfig';
import {AppView} from '../../common';
import useMarker from '../useMarker';
let isFirst = true;

const MapLocation = forwardRef(({location, renderProps}, ref) => {
  let mapRef = useRef();
  const [setMarkerCoords, markerCoords] = useMarker(location, ref);
  const initialRegion = useMemo(
    () =>
      location
        ? MapConfig.createRegion(location.latitude, location.longitude)
        : null,
    [location],
  );

  const [setRegion, region] = useMarker(initialRegion, ref);

  useEffect(() => {
    setMarkerCoords(location || MapConfig.DEFAULT_REGION);
    if (!isFirst) {
      setMarkerCoords(location || MapConfig.LOCATIONPH);
      const newRegion = {
        ...(location ? location : MapConfig.LOCATIONPH),
        latitudeDelta: MapConfig.LATITUDE_DELTA,
        longitudeDelta: MapConfig.LATITUDE_DELTA,
      };
      setRegion(newRegion);
      console.log(newRegion, 'region');
      mapRef.current.animateToRegion(newRegion, 400);
    } else {
      isFirst = false;
    }
    return () => {
      isFirst = true;
    };
  }, [location, setMarkerCoords, setRegion]);

  const onRegionChangeComplete = useCallback(
    (newRegion) => {
      setRegion(newRegion);
    },
    [setRegion],
  );
  return (
    <AppView flex stretch>
      <MapView
        onPress={(e) => {
          setMarkerCoords(e.nativeEvent.coordinate);
        }}
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.mapContainer}
        minZoomLevel={1}
        onRegionChangeComplete={onRegionChangeComplete}
        initialRegion={initialRegion}
        showsUserLocation={false}
        mapPadding={MapConfig.DEFAULT_PADDING}
        rotateEnabled={false}
        showsMyLocationButton={false}>
        {renderProps && renderProps(markerCoords, region)}
      </MapView>
    </AppView>
  );
});

export default MapLocation;
