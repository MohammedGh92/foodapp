import {useMemo} from 'react';
import {
  dimensionsStyles,
  selfLayoutStyles,
  childrenLayoutStyles,
  overflowStyles,
  elevationStyles,
} from '../Base';
import {useSelector} from 'react-redux';

const useViewStyles = props => {
  const rtl = useSelector(state => state.lang.rtl);
  const {
    width,
    height,
    equalSize,
    flex,
    stretch,
    centerSelf,
    leftSelf,
    rightSelf,
    topSelf,
    bottomSelf,
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
    elevation,
    overflow,
    row,
  } = props;

  const memoizedViewStyles = useMemo(() => {
    let styles = {};
    if (width || height || equalSize) {
      styles = dimensionsStyles({width, height, equalSize});
    }
    if (
      flex ||
      stretch ||
      centerSelf ||
      leftSelf ||
      rightSelf ||
      topSelf ||
      bottomSelf
    ) {
      styles = {
        ...styles,
        ...selfLayoutStyles({
          flex,
          stretch,
          centerSelf,
          leftSelf,
          rightSelf,
          topSelf,
          bottomSelf,
        }),
      };
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
    if (overflow) {
      styles = {...styles, ...overflowStyles({overflow})};
    }
    if (elevation) {
      styles = {...styles, ...elevationStyles({elevation})};
    }
    return styles;
  }, [
    width,
    height,
    equalSize,
    flex,
    stretch,
    centerSelf,
    leftSelf,
    rightSelf,
    topSelf,
    bottomSelf,
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
    overflow,
    elevation,
  ]);
  return memoizedViewStyles;
};

export default useViewStyles;
