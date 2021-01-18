import React, {useMemo} from 'react';
import I18n from 'react-native-i18n';
import {useSelector} from 'react-redux';
import {AppAccordion} from '..';
import TripItem from '../TripItem';
const CarOwnerData = ({carOwner}) => {
  const data = useMemo(
    () => [
      {
        title: I18n.t('car-owner-data'),
        content: (
          <>
            <TripItem
              subValue={carOwner.name}
              value={I18n.t('car-owner-name')}
            />
            <TripItem
              subValue={carOwner.average_rating}
              value={I18n.t('car-owner-rate')}
            />
            <TripItem
              subValue={carOwner.name}
              value={I18n.t('car-owner-accreditation')}
            />
          </>
        ),
      },
    ],
    [carOwner],
  );
  return <AppAccordion data={data} />;
};

export default CarOwnerData;
