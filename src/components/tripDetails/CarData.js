import React, {useMemo} from 'react';
import I18n from 'react-native-i18n';
import {AppAccordion} from '..';
import {APP_BASE_URL} from '../../api/utils/urls';
import {AppImage, AppView} from '../../common';
import TripItem from '../TripItem';
const CarData = ({userCar}) => {
  const data = useMemo(
    () => [
      {
        title: I18n.t('car-data'),
        content: userCar ? (
          <>
            <TripItem value={I18n.t('model')} subValue={userCar.model} />
            <TripItem
              value={I18n.t('gender')}
              subValue={userCar.carType.name}
            />
            <TripItem
              value={I18n.t('plate-number')}
              subValue={userCar.car_number}
            />
            <TripItem
              value={I18n.t('number-passengers')}
              subValue={userCar.available_users_number}
            />
            <AppView stretch row spaceBetween>
              <TripItem value={I18n.t('car-image')} />
              <AppImage
                // backgroundColor="red"
                resizeMode="cover"
                circleRadius={10}
                source={{uri: `${APP_BASE_URL}${userCar.image}`}}
              />
            </AppView>
          </>
        ) : (
          <AppView />
        ),
      },
    ],
    [userCar],
  );
  return <AppAccordion data={data} />;
};

export default CarData;
