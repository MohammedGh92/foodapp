import React, {useState, useEffect} from 'react';
import {AppView} from '../../common';
import styles from './styles';

const Overlay = () => {
  const [isContentReady, setIsContentReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsContentReady(true);
    }, 200);
  }, []);
  return !isContentReady ? <AppView style={styles.overlay} /> : <AppView />;
};

export default Overlay;
