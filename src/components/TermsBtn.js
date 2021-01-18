import React from 'react';
import {TouchableView, AppText, AppNavigation} from '../common';
import I18n from 'react-native-i18n';

const TermsBtn = ({color, pushTerms}) => {
  return (
    <TouchableView touchableOpacity onPress={pushTerms}>
      <AppText
        size={6.5}
        borderBottomWidth={1}
        borderBottomColor="white"
        {...{color}}>
        {I18n.t('terms-and-conditions')}
      </AppText>
    </TouchableView>
  );
};
TermsBtn.defaultProps = {
  color: 'white',
  pushTerms: () => AppNavigation.push('termsAndConditions'),
};

export default TermsBtn;
