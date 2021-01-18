import React, {useMemo} from 'react';
import I18n from 'react-native-i18n';
import {AppAccordion} from '..';
import {AppView} from '../../common';
import TripItem from '../TripItem';
const CarOwnerPref = ({hobbies}) => {
  console.log;
  const data = useMemo(
    () => [
      {
        title: I18n.t('car-owner-prefrences'),
        content: hobbies ? (
          <>
            {hobbies.map(({hobby, hobby_option}) => {
              return (
                <TripItem value={hobby.name} subValue={hobby_option.name} />
              );
            })}
          </>
        ) : (
          <AppView />
        ),
      },
    ],
    [hobbies],
  );
  return <AppAccordion data={data} />;
};

export default CarOwnerPref;
