import React from 'react';
import {StyleSheet} from 'react-native';
import {AppView} from '../common';

const BlockingView = () => {
  return <AppView pointerEvents={'none'} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    start: 0,
    end: 0,
    top: 0,
    // backgroundColor: 'red',
    bottom: 0,
    zIndex: 10000,
  },
});

export default BlockingView;
