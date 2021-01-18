import React, {useMemo} from 'react';
import {Slider, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  trackStyle: {
    height: 20,
    color: 'green',
  },
});
const AppSlider = () => {
  const {
    style,
    step,
    minimumValue,
    maximumValue,
    onValueChange,
    value,
    thumbTintColor,
    ...rest
  } = this.props;
  return useMemo(() => {
    return (
      <Slider
        {...rest}
        style={style}
        minimumValue={minimumValue}
        setp={step}
        maximumValue={maximumValue}
        onValueChange={onValueChange}
        value={value}
        thumbTintColor={thumbTintColor}
        trackStyle={styles.trackStyle}
      />
    );
  }, [
    maximumValue,
    minimumValue,
    onValueChange,
    rest,
    step,
    style,
    thumbTintColor,
    value,
  ]);
};

AppSlider.defaultProps = {
  disabled: false,
  onValueChange: () => {},
  minimumTrackTintColor: '#F56363',
  step: 2,
  thumbTintColor: '#F56363',
};

export default AppSlider;
