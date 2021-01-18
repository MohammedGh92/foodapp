import {useMemo} from 'react';
import {
  fontSizeStyles,
  fontFamilyStyles,
  textDirectionStyles,
  colorStyles,
} from '../Base';
import {isASCII} from './text';
import {responsiveFontSize} from './responsiveDimensions';

const useTextStyles = (props, children) => {
  const {
    size,
    font,
    bold,
    left,
    right,
    center,
    stretch,
    reverse,
    color,
    lineHeight,
  } = props;

  const memoizedTextStyles = useMemo(() => {
    let styles = {};
    if (left || right || center || stretch || reverse) {
      styles = textDirectionStyles({left, right, center, stretch, reverse});
    }

    if (size) {
      styles = {...styles, ...fontSizeStyles({size})};
    }

    // if (font || bold) {
    styles = {...styles, ...fontFamilyStyles({font, bold})};
    // }

    if (color) {
      styles = {...styles, ...colorStyles({color})};
    }

    if (typeof children === 'string') {
      styles = {...styles, writingDirection: isASCII(children) ? 'ltr' : 'rtl'};
    }

    if (lineHeight) {
      styles = {...styles, lineHeight: responsiveFontSize(lineHeight)};
    }
    return styles;
  }, [
    left,
    right,
    center,
    stretch,
    reverse,
    size,
    font,
    bold,
    color,
    children,
    lineHeight,
  ]);
  return memoizedTextStyles;
};

export default useTextStyles;
