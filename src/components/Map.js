import React, { useState, useEffect } from 'react';
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Alert } from 'react-native';
import {
    AppView, AppText, AppButton, showInfo, AppNavigation,
} from '../common';
import Geolocation from '@react-native-community/geolocation';
import Permissions from 'react-native-permissions';
import I18n from "react-native-i18n";
import RNSettings from 'react-native-settings';
import { useSelector } from 'react-redux';
import colors from '../common/defaults/colors';
import { CustomHeader } from './';

export default MapComponent = props => {
    const [loc, setLoc] = useState(null)
    const [initialRegion, setInitialRegion] = useState(null)
    const rtl = useSelector(state => state.lang.rtl);

    useEffect(() => {
        RNSettings.getSetting(RNSettings.LOCATION_SETTING).then(result => {
            if (result === RNSettings.ENABLED) {
                _requestPermission();
            } else {
                Alert.alert(
                    I18n.t('Alert'),
                    I18n.t('enableGPS'),
                    [{
                        text: I18n.t('Settings'),
                        onPress: () => {
                            RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS).then(
                                result => {
                                    if (result === RNSettings.ENABLED) {
                                        _requestPermission()
                                    }
                                    else {
                                    }
                                },
                            );
                        }
                    },
                    ],
                    { cancelable: false },
                );
            }
        });

    }, [])

    const _requestPermission = () => {
        Permissions.request('location').then(response => {
            console.log("++++++++++++++++++++++++ ", response)
            if (
                response === 'denied' ||
                response === 'undetermined' ||
                response === 'restricted'
            ) {
                _requestPermission();
            } else {
                getLatLng();
            }
        });
    }

    const getLatLng = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setInitialRegion({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                })
                setLoc(
                    {
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                )
            },
            error => {
                getLatLng();
            }, { timeout: 10000 }
        );
    }

    const longPress = (e) => {
        setLoc(
            {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        )
        // props.onLocationChange(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
    }
    const renderMap = () => {
        return (
            <MapView
                style={{ ...StyleSheet.absoluteFillObject }}
                provider="google"
                initialRegion={initialRegion}
                onLongPress={event => longPress(event)}
            >
                {loc && <Marker coordinate={loc} />}
            </MapView >
        )
    };
    return (
        <AppView flex stretch >
            <CustomHeader title='Pick location' hideCart />
            <AppView flex stretch>
                <AppView backgroundColor='transparent' stretch center
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10000 }}>
                    <AppText color={colors.black} bold marginVertical={5} stretch center size={7} backgroundColor='transparent'
                    >{I18n.t('Long press to locate the map')}</AppText>
                </AppView>
                {initialRegion && renderMap()}
                <AppView stretch backgroundColor='transparent' center
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10000 }}>
                    <AppButton
                        title={I18n.t('select')}
                        borderRadius={10}
                        height={6} width={25}
                        marginBottom={5}
                        onPress={() => {
                            if (loc) {

                                AppNavigation.push({
                                    name: 'bill'
                                })

                            } else {
                                showInfo(I18n.t('The location must be located on the map'))
                            }
                        }}
                    />
                </AppView>

            </AppView>
        </AppView>
    );
}