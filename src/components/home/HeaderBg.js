import React from 'react';
import {AppImage} from '../../common';
import {StyleSheet} from 'react-native';
const headerImg = require('../../assets/imgs/homeHeader.png');
const HeaderBg = () => {
  return (
    <AppImage
      style={styles.container}
      resizeMode="stretch"
      source={headerImg}
      stretch
      height={32}
    />
  );
};

const styles = StyleSheet.create({
  container: {position: 'absolute', top: 0},
});
export default HeaderBg;
