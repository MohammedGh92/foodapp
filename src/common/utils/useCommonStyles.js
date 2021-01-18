import {useMemo} from 'react';
import {
  backgroundColorStyles,
  paddingStyles,
  marginStyles,
  borderStyles,
  borderRadiusStyles,
} from '../Base';
import {useSelector} from 'react-redux';

const useCommonStyles = props => {
  const rtl = useSelector(state => state.lang.rtl);
  const {
    elevation,
    backgroundColor,
    row,
    marginHorizontal,
    marginVertical,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    margin,
    padding,
    paddingVertical,
    paddingTop,
    paddingBottom,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
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
    borderTopWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
    borderWidth,
  } = props;

  const memoizedCommonStyles = useMemo(() => {
    let styles = {};
    if (elevation || backgroundColor) {
      styles = backgroundColorStyles(props);
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
      styles = {
        ...styles,
        ...borderStyles({
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
        }),
      };
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
    return styles;
  }, [
    elevation,
    backgroundColor,
    row,
    rtl,
    padding,
    paddingVertical,
    paddingTop,
    paddingBottom,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
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
    props,
  ]);
  return memoizedCommonStyles;
};

export default useCommonStyles;
