import {useMemo} from 'react';
import {
  dimensionsStyles,
  selfLayoutStyles,
  overflowStyles,
  elevationStyles,
  backgroundColorStyles,
  marginStyles,
  borderRadiusStyles,
  borderStyles,
} from '../Base';
import {useSelector} from 'react-redux';

const useTouchableViewStyles = props => {
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
    elevation,
    overflow,
    backgroundColor,
    marginHorizontal,
    marginVertical,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    margin,
    borderTopWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
    borderWidth,
    borderTopColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    borderColor,
    borderRadius,
    circleRadius,

    borderTopRightRadius,
    borderTopLeftRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
  } = props;

  const memoizedTouchableStyles = useMemo(() => {
    let styles = {};
    if (
      borderTopWidth ||
      borderBottomWidth ||
      borderLeftWidth ||
      borderRightWidth ||
      borderWidth ||
      borderTopColor ||
      borderBottomColor ||
      borderLeftColor ||
      borderRightColor ||
      borderColor
    ) {
      styles = borderStyles({
        borderTopWidth,
        borderBottomWidth,
        borderLeftWidth,
        borderRightWidth,
        borderWidth,
        borderTopColor,
        borderBottomColor,
        borderLeftColor,
        borderRightColor,
        borderColor,
      });
    }

    if (
      borderRadius ||
      circleRadius ||
      rtl ||
      borderTopRightRadius ||
      borderTopLeftRadius ||
      borderBottomRightRadius ||
      borderBottomLeftRadius
    ) {
      styles = {
        ...styles,
        ...borderRadiusStyles({
          borderRadius,
          circleRadius,
          rtl,
          borderTopRightRadius,
          borderTopLeftRadius,
          borderBottomRightRadius,
          borderBottomLeftRadius,
        }),
      };
    }

    if (
      marginHorizontal ||
      marginVertical ||
      marginLeft ||
      marginRight ||
      marginTop ||
      marginBottom ||
      margin
    ) {
      styles = {
        ...styles,
        ...marginStyles({
          marginHorizontal,
          marginVertical,
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
          margin,
        }),
      };
    }

    if (elevation || backgroundColor) {
      styles = {
        ...styles,
        ...backgroundColorStyles({elevation, backgroundColor}),
      };
    }

    if (width || height || equalSize) {
      styles = {...dimensionsStyles(props), ...styles};
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
      styles = {...styles, ...selfLayoutStyles(props)};
    }

    if (overflow) {
      styles = {...styles, ...overflowStyles(props)};
    }

    if (elevation) {
      styles = {...styles, ...elevationStyles(props)};
    }
    return styles;
  }, [
    backgroundColor,
    borderBottomColor,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderBottomWidth,
    borderColor,
    borderLeftColor,
    borderLeftWidth,
    borderRadius,
    borderRightColor,
    borderRightWidth,
    borderTopColor,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderTopWidth,
    borderWidth,
    bottomSelf,
    centerSelf,
    circleRadius,
    elevation,
    equalSize,
    flex,
    height,
    leftSelf,
    margin,
    marginBottom,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginTop,
    marginVertical,
    overflow,
    props,
    rightSelf,
    rtl,
    stretch,
    topSelf,
    width,
  ]);
  return memoizedTouchableStyles;
};

export default useTouchableViewStyles;
