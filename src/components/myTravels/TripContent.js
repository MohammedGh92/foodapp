import React from 'react';
import {add} from 'react-native-reanimated';
import {AppText, AppView} from '../../common';
import TagItem from '../TagItem';

const TripContent = ({status, city, tripStatus, event}) => {
  return (
    <AppView stretch>
      <AppView stretch row spaceBetween>
        {city && (
          <TagItem backgroundColor="foreground" title={city ? city.name : ''} />
        )}
        {tripStatus && (
          <TagItem
            backgroundColor={tripStatus.id === 1 ? 'primary' : 'secondary'}
            icon={false}
            title={tripStatus.name}
          />
        )}
      </AppView>
      {event && (
        <AppText
          numberOfLines={2}
          size={7}
          marginVertical={5}
          color="secondary">
          {event.name}
        </AppText>
      )}
    </AppView>
  );
};

export default TripContent;
