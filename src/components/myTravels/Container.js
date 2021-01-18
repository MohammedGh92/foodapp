import React, {useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {BASE_URL} from '../../api/utils/urls';
import {AppList, AppView} from '../../common';
import TabsContext from '../../contexts/TabsContext';
import PassengersTripsCard from './PassengersTripsCard';
import DriversRequestsCard from './DriversRequestsCard';
import DriversTripsCard from './DriversTripsCard';
import Tabs from './Tabs';

const Container = () => {
  const [selected, setSelected] = useState(1);

  const travelsList = useSelector((state) => state.list.travelsList);
  const userData = useSelector((state) => state.auth.userData);

  const DynamicItems = useMemo(() => {
    if (selected === 1) {
      return {
        url: `drivers/${userData?.user?.id}/requests`,
        Card: DriversRequestsCard,
      };
    }
    if (selected === 2) {
      return {
        url: `passengers/${userData?.user?.id}/trips`,
        Card: PassengersTripsCard,
      };
    }

    return {
      url: `drivers/${userData?.user?.id}/trips`,

      Card: DriversTripsCard,
    };
  }, [selected, userData]);
  return (
    <TabsContext.Provider value={{selected, setSelected}}>
      <Tabs />
      <AppView flex stretch marginBottom={20}>
        <AppList
          refreshControl={travelsList}
          flex
          apiRequest={{
            url: `${BASE_URL}${DynamicItems.url}`,
          }}
          stretch
          rowRenderer={(data) => <DynamicItems.Card {...data} />}
        />
      </AppView>
    </TabsContext.Provider>
  );
};

export default Container;
