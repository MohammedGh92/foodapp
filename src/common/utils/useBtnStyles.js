import {useMemo} from 'react';
import {overflowStyles, childrenLayoutStyles, paddingStyles} from '../Base';
import {useSelector} from 'react-redux';

const useBtnStyles = props => {
  const {
    width,
    height,
    equalSize,
    flex,
    stretch,
    circleRadius,
    flexInnerTouchable,
    stretchInnerTouchable,
    overflow,
    row,
    top,
    bottom,
    centerY,
    left,
    right,
    centerX,
    center,
    stretchChildren,
    spaceBetween,
    spaceAround,
    reverse,
    wrap,
    padding,
    paddingVertical,
    paddingTop,
    paddingBottom,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
  } = props;
  const rtl = useSelector(state => state.lang.rtl);
  const memoizedBtnStyles = useMemo(() => {
    let styles = {};
    if (overflow) {
      styles = overflowStyles(overflow);
    }
    if (
      row ||
      top ||
      bottom ||
      centerY ||
      left ||
      right ||
      centerX ||
      center ||
      stretchChildren ||
      spaceBetween ||
      spaceAround ||
      reverse ||
      wrap ||
      rtl
    ) {
      styles = {
        ...styles,
        ...childrenLayoutStyles({
          row,
          top,
          bottom,
          centerY,
          left,
          right,
          centerX,
          center,
          stretchChildren,
          spaceBetween,
          spaceAround,
          reverse,
          wrap,
          rtl,
        }),
      };
    }
    if (
      row ||
      rtl ||
      padding ||
      paddingVertical ||
      paddingTop ||
      paddingBottom ||
      paddingHorizontal ||
      paddingLeft ||
      paddingRight
    ) {
      styles = {
        ...styles,
        ...paddingStyles({
          row,
          rtl,
          padding,
          paddingVertical,
          paddingTop,
          paddingBottom,
          paddingHorizontal,
          paddingLeft,
          paddingRight,
        }),
      };
    }
    if (
      flex ||
      flexInnerTouchable ||
      height ||
      equalSize ||
      circleRadius ||
      stretch ||
      stretchInnerTouchable ||
      width
    ) {
      styles = {
        ...styles,
        flex:
          flex || flexInnerTouchable || height || equalSize || circleRadius
            ? 1
            : null,
        alignSelf:
          stretch || stretchInnerTouchable || width || equalSize || circleRadius
            ? 'stretch'
            : null,
      };
    }
    return styles;
  }, [
    bottom,
    center,
    centerX,
    centerY,
    circleRadius,
    equalSize,
    flex,
    flexInnerTouchable,
    height,
    left,
    overflow,
    padding,
    paddingBottom,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingVertical,
    reverse,
    right,
    row,
    rtl,
    spaceAround,
    spaceBetween,
    stretch,
    stretchChildren,
    stretchInnerTouchable,
    top,
    width,
    wrap,
  ]);
  return memoizedBtnStyles;
};

export default useBtnStyles;
