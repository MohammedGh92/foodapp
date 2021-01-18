import React from 'react';
import {AppDatePicker, AppIcon, AppView} from '../../common';
import I18n from 'react-native-i18n';
import {useSelector} from 'react-redux';
const TimePeriod = ({injectFormProps}) => {
  const rtl = useSelector((state) => state.lang.rtl);
  return (
    <AppView stretch>
      <AppDatePicker
        marginVertical={5}
        {...injectFormProps('start_date', 'onSelect')}
        stretch
        placeholder={I18n.t('from')}
        paddingHorizontal={5}
        momentFormat="YYYY-MM-DD HH:mm:ss"
        presentationFormat={`${
          rtl ? 'hh:mm:ssA   YYYY-MM-DD' : 'DD-MM-YYYY   hh:mm:ssA'
        }`}
        minDate={new Date()}
        marginHorizontal={1}
        borderWidth={0}
        elevation={1}
        rightItems={
          <AppIcon size={9} margin={5} name="date-range" type="material" />
        }
      />

      <AppDatePicker
        placeholder={I18n.t('to')}
        {...injectFormProps('end_date', 'onSelect')}
        stretch
        marginHorizontal={1}
        paddingHorizontal={5}
        momentFormat="YYYY-MM-DD HH:mm:ss"
        presentationFormat={`${
          rtl ? 'hh:mm:ssA   YYYY-MM-DD' : 'DD-MM-YYYY   hh:mm:ssA'
        }`}
        minDate={new Date()}
        borderWidth={0}
        elevation={1}
        rightItems={
          <AppIcon size={9} margin={5} name="date-range" type="material" />
        }
      />
    </AppView>
  );
};

export default TimePeriod;
