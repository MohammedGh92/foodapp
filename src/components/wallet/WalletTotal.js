import React from 'react';
import { AppText, AppView, TouchableView } from '../../common';
import I18n from "react-native-i18n";
const WalletTotal = ({ walletTotal }) => {
  return (
    <AppView stretch center backgroundColor="secondary" borderRadius={10} margin={5} paddingVertical={15} >
      <AppText color="#fff" size={7}>
        {I18n.t("you-have-in-your-wallet")}
      </AppText>
      <AppView row stretch center marginTop={2}>
        <AppText color="primary" bold size={15}>
          {walletTotal.toFixed(2)}
        </AppText>
        <AppText color="#fff" marginTop={5} marginHorizontal={2}>
          {I18n.t("sar")}
        </AppText>
      </AppView>
    </AppView>

  );
};

export default WalletTotal;
