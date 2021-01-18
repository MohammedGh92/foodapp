import React from 'react';
import {AppText, AppView} from '../common';
import EventItem from './EventItem';

const TripItem = ({subValue, value, ...rest}) => {
  return (
    <AppView stretch row spaceBetween center>
      <EventItem {...rest} {...{value}} />
      <AppView {...(value ? {left: true} : {})} flex>
        <AppText>{subValue}</AppText>
      </AppView>
    </AppView>
  );
};

export default TripItem;
