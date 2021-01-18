import {Platform, PixelRatio} from 'react-native';
import PropTypes from 'prop-types';

import {getThemeColor} from './utils/colors';
import {getFonts} from './Theme';

import {
  moderateScale,
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from './utils/responsiveDimensions';

const {roundToNearestPixel} = PixelRatio;

export const BasePropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  rtl: PropTypes.bool,

  left: PropTypes.bool,
  right: PropTypes.bool,
  center: PropTypes.bool,
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  centerX: PropTypes.bool,
  centerY: PropTypes.bool,
  reverse: PropTypes.bool,

  equalSize: PropTypes.number,
  circleRadius: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  expWidth: PropTypes.number,

  font: PropTypes.string,
  size: PropTypes.number,
  bold: PropTypes.bool,
  color: PropTypes.string,
  disabledColor: PropTypes.string,

  flex: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  stretch: PropTypes.bool,
  leftSelf: PropTypes.bool,
  rightSelf: PropTypes.bool,
  topSelf: PropTypes.bool,
  bottomSelf: PropTypes.bool,
  centerSelf: PropTypes.bool,

  row: PropTypes.bool,
  spaceBetween: PropTypes.bool,
  spaceAround: PropTypes.bool,
  stretchChildren: PropTypes.bool,
  wrap: PropTypes.bool,

  backgroundColor: PropTypes.string,
  disabledBackgroundColor: PropTypes.string,
  elevation: PropTypes.number,

  padding: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  paddingVertical: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  margin: PropTypes.number,
  marginHorizontal: PropTypes.number,
  marginVertical: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,

  borderColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  borderTopColor: PropTypes.string,
  borderLeftColor: PropTypes.string,
  borderRighttColor: PropTypes.string,
  borderWidth: PropTypes.number,
  borderBottomWidth: PropTypes.number,
  borderTopWidth: PropTypes.number,
  borderLeftWidth: PropTypes.number,
  borderRightWidth: PropTypes.number,

  borderRadius: PropTypes.number,
  translateNumbers: PropTypes.bool,
};

export const dimensionsStyles = (props) => {
  const {width, height, equalSize} = props;

  let h = responsiveHeight(height);
  if (equalSize) {
    h = responsiveWidth(equalSize);
  }

  let w = responsiveWidth(width);
  if (equalSize) {
    w = responsiveWidth(equalSize);
  }

  const styles = {};
  if (!isNaN(w)) {
    styles.width = w;
  }
  if (!isNaN(h)) {
    styles.height = h;
  }

  return styles;
};

export const selfLayoutStyles = (props) => {
  const {
    flex,
    stretch,
    centerSelf,
    leftSelf,
    rightSelf,
    topSelf,
    bottomSelf,
  } = props;

  let alignSelf = topSelf || leftSelf ? 'flex-start' : null;
  alignSelf = bottomSelf || rightSelf ? 'flex-end' : alignSelf;
  alignSelf = centerSelf ? 'center' : alignSelf;
  alignSelf = stretch ? 'stretch' : alignSelf;
  const f = flex ? (typeof flex === 'number' ? flex : 1) : null;

  return {
    flex: f,
    alignSelf,
  };
};

export const childrenLayoutStyles = (props) => {
  const styles = {};
  const {
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
  } = props;

  const rtl = reverse ? !props.rtl : props.rtl;

  if (row) {
    styles.flexDirection = rtl ? 'row-reverse' : 'row';
    styles.alignItems = 'center';
    styles.flexWrap = wrap ? 'wrap' : 'nowrap';
  } else {
    styles.flexDirection = 'column';
    styles.alignItems = rtl ? 'flex-end' : 'flex-start';
  }

  if (top) {
    styles.justifyContent = 'flex-start';
  }
  if (bottom) {
    styles.justifyContent = 'flex-end';
  }
  if (centerY) {
    styles.justifyContent = 'center';
  }

  if (left) {
    styles.alignItems = 'flex-start';
  }
  if (right) {
    styles.alignItems = 'flex-end';
  }
  if (centerX) {
    styles.alignItems = 'center';
  }

  if (center) {
    styles.justifyContent = 'center';
    styles.alignItems = 'center';
  }

  if (stretchChildren) {
    styles.alignItems = 'stretch';
    styles.alignSelf = 'stretch';
  }
  if (spaceBetween) {
    styles.justifyContent = 'space-between';
  }
  if (spaceAround) {
    styles.justifyContent = 'space-around';
  }

  return styles;
};

export const colorStyles = (props) => ({
  color: getThemeColor(props.color),
});

export const fontSizeStyles = (props, scaleFix = 1) => {
  return {
    fontSize: responsiveFontSize(props.size * scaleFix),
  };
};

export const fontFamilyStyles = (props) => {
  const {font, bold} = props;

  return {
    fontFamily: font || (bold ? getFonts().bold : getFonts().normal),
    fontWeight:
      getFonts().boldIsStyle 
        ? bold
          ? 'bold'
          : 'normal'
        : null,
  };
};

export const textDirectionStyles = (props) => {
  const {left, right, center, stretch, reverse} = props;
  const rtl = reverse ? !props.rtl : props.rtl;

  const styles = {
    textAlignVertical: 'center',
    writingDirection: props.rtl ? 'rtl' : 'ltr',
    textAlign: rtl ? 'right' : 'left',
  };

  if (stretch) {
    styles.alignSelf = 'stretch';
  }
  if (left) {
    styles.textAlign = 'left';
  }
  if (right) {
    styles.textAlign = 'right';
  }
  if (center) {
    styles.textAlign = 'center';
  }

  return styles;
};

export const backgroundColorStyles = (props) => {
  const styles = {};
  const {elevation, backgroundColor} = props;

  if (backgroundColor && typeof backgroundColor === 'string') {
    styles.backgroundColor = getThemeColor(backgroundColor);
  } else if (elevation) {
    styles.backgroundColor = 'white';
  }

  return styles;
};

export const overflowStyles = (props) => {
  const {overflow} = props;

  if (overflow) {
    return {
      overflow,
    };
  }

  return {};
};

export const elevationStyles = (props) => {
  const styles = {};
  const {elevation} = props;

  if (elevation) {
    // if (Platform.OS === 'ios') {
    styles.shadowColor = '#A3A3A333';
    styles.shadowOffset = {
      height: elevation - 1,
      width: elevation - 1,
    };
    styles.shadowOpacity = 1;
    styles.shadowRadius = elevation - 1;
    // } else {
    styles.elevation = elevation;
    // }
  }

  return styles;
};

export const paddingStyles = (props) => {
  const {row, rtl} = props;
  let {
    padding,
    p,
    paddingVertical,
    paddingTop,
    paddingBottom,
    pv,
    pt,
    pb,
  } = props;
  let {paddingHorizontal, paddingLeft, paddingRight, ph, pl, pr} = props;

  padding = padding || p;
  paddingVertical = paddingVertical || pv;
  paddingHorizontal = paddingHorizontal || ph;
  paddingLeft = paddingLeft || pl;
  paddingRight = paddingRight || pr;
  paddingTop = paddingTop || pt;
  paddingBottom = paddingBottom || pb;

  paddingVertical =
    typeof paddingVertical === 'number' ? paddingVertical : padding;
  paddingHorizontal =
    typeof paddingHorizontal === 'number' ? paddingHorizontal : padding;
  paddingTop = typeof paddingTop === 'number' ? paddingTop : paddingVertical;
  paddingBottom =
    typeof paddingBottom === 'number' ? paddingBottom : paddingVertical;
  paddingLeft =
    typeof paddingLeft === 'number' ? paddingLeft : paddingHorizontal;
  paddingRight =
    typeof paddingRight === 'number' ? paddingRight : paddingHorizontal;

  const temp_paddingLeft = paddingLeft;
  const temp_paddingRight = paddingRight;
  if ((paddingLeft || paddingRight) && rtl && !row) {
    paddingRight = temp_paddingLeft;
    paddingLeft = temp_paddingRight;
  }

  return {
    paddingTop: moderateScale(paddingTop) || 0,
    paddingBottom: moderateScale(paddingBottom) || 0,
    paddingLeft: moderateScale(paddingLeft) || 0,
    paddingRight: moderateScale(paddingRight) || 0,
  };
};

export const marginStyles = (props) => {
  const styles = {};

  const {row, rtl} = props;
  let {
    marginHorizontal,
    marginVertical,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    m,
    mv,
    mh,
    ml,
    mr,
    mt,
    mb,
    margin,
  } = props;

  margin = margin || m;
  marginVertical = marginVertical || mv;
  marginHorizontal = marginHorizontal || mh;
  marginTop = marginTop || mt;
  marginBottom = marginBottom || mb;
  marginLeft = marginLeft || ml;
  marginRight = marginRight || mr;

  marginHorizontal =
    typeof marginHorizontal === 'number' ? marginHorizontal : margin;
  marginVertical = typeof marginVertical === 'number' ? marginVertical : margin;
  marginLeft = typeof marginLeft === 'number' ? marginLeft : marginHorizontal;
  marginRight =
    typeof marginRight === 'number' ? marginRight : marginHorizontal;
  marginTop = typeof marginTop === 'number' ? marginTop : marginVertical;
  marginBottom =
    typeof marginBottom === 'number' ? marginBottom : marginVertical;

  const temp_ml = marginLeft;
  const temp_mr = marginRight;

  if ((marginLeft || marginRight) && rtl && !row) {
    marginRight = temp_ml;
    marginLeft = temp_mr;
  }

  styles.marginLeft = moderateScale(marginLeft) || 0;
  styles.marginRight = moderateScale(marginRight) || 0;
  styles.marginTop = moderateScale(marginTop) || 0;
  styles.marginBottom = moderateScale(marginBottom) || 0;

  return styles;
};

export const borderStyles = (props) => {
  const styles = {};

  const {rtl} = props;
  let {
    borderTopWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
    borderWidth,
    bw,
    bbw,
    btw,
    blw,
    brw,
  } = props;

  borderWidth = borderWidth || bw;
  borderTopWidth = borderTopWidth || btw;
  borderBottomWidth = borderBottomWidth || bbw;
  borderLeftWidth = borderLeftWidth || blw;
  borderRightWidth = borderRightWidth || brw;

  borderTopWidth =
    typeof borderTopWidth === 'number' ? borderTopWidth : borderWidth;
  borderBottomWidth =
    typeof borderBottomWidth === 'number' ? borderBottomWidth : borderWidth;
  borderLeftWidth =
    typeof borderLeftWidth === 'number' ? borderLeftWidth : borderWidth;
  borderRightWidth =
    typeof borderRightWidth === 'number' ? borderRightWidth : borderWidth;

  const temp_blw = borderLeftWidth;
  const temp_brw = borderRightWidth;
  if ((borderRightWidth || borderLeftWidth) && rtl) {
    borderLeftWidth = temp_brw;
    borderRightWidth = temp_blw;
  }

  let {
    borderTopColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    borderColor,
    bc,
    btc,
    bbc,
    blc,
    brc,
  } = props;

  borderColor = bc || borderColor;
  borderLeftColor = borderLeftColor || blc;
  borderRightColor = borderRightColor || brc;
  borderTopColor = borderTopColor || btc;
  borderBottomColor = borderBottomColor || bbc;

  borderTopColor = borderTopColor || borderColor;
  borderBottomColor = borderBottomColor || borderColor;
  borderLeftColor = borderLeftColor || borderColor;
  borderRightColor = borderRightColor || borderColor;

  const temp_blc = borderLeftColor;
  const temp_brc = borderRightColor;
  if ((borderRightColor || borderLeftColor) && rtl) {
    borderLeftColor = temp_brc;
    borderRightColor = temp_blc;
  }

  styles.borderTopWidth = roundToNearestPixel(borderTopWidth) || 0;
  styles.borderBottomWidth = roundToNearestPixel(borderBottomWidth) || 0;
  styles.borderLeftWidth = roundToNearestPixel(borderLeftWidth) || 0;
  styles.borderRightWidth = roundToNearestPixel(borderRightWidth) || 0;

  styles.borderTopColor = getThemeColor(borderTopColor);
  styles.borderBottomColor = getThemeColor(borderBottomColor);
  styles.borderLeftColor = getThemeColor(borderLeftColor);
  styles.borderRightColor = getThemeColor(borderRightColor);

  return styles;
};

export const borderRadiusStyles = (props) => {
  const styles = {};
  const {borderRadius, circleRadius, rtl} = props;

  let {
    borderTopRightRadius,
    borderTopLeftRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
  } = props;

  if (borderRadius) {
    styles.borderRadius = borderRadius;
    // styles.overflow = 'hidden';
  }

  const temp_top = borderTopLeftRadius;
  const temp_bottom = borderBottomLeftRadius;
  if (rtl) {
    borderTopLeftRadius = borderTopRightRadius;
    borderTopRightRadius = temp_top;

    borderBottomLeftRadius = borderBottomRightRadius;
    borderBottomRightRadius = temp_bottom;
  }

  if (borderTopLeftRadius) {
    styles.borderTopLeftRadius = borderTopLeftRadius;
  }
  if (borderTopRightRadius) {
    styles.borderTopRightRadius = borderTopRightRadius;
  }
  if (borderBottomLeftRadius) {
    styles.borderBottomLeftRadius = borderBottomLeftRadius;
  }
  if (borderBottomRightRadius) {
    styles.borderBottomRightRadius = borderBottomRightRadius;
  }

  if (circleRadius) {
    styles.width = responsiveWidth(circleRadius);
    styles.height = responsiveWidth(circleRadius);
    styles.borderRadius = responsiveWidth(circleRadius) / 2;
    styles.overflow = 'hidden';
  }

  return styles;
};
