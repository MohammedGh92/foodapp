import React, {useState} from 'react';
import View from './View';
import Text from './Text';
import Indicator from './Indicator';
import {getTheme} from './Theme';

import AppView from './View';
import TouchableView from './TouchableView';
const log = () => {
  console.log('Please attach a method to this component');
};

const Button = (props) => {
  const {processing} = props;
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    layoutReady: false,
  });

  const onPress = (event) => {
    if (props.disabled) {
      return;
    }
    if (processing) {
      return;
    }

    props.onPress(event);
  };

  const renderLeftIcon = (c) => {
    const {leftIcon, rightIcon, title, size} = props;

    return React.cloneElement(leftIcon, {
      size: leftIcon.props.size || size * 1.4,
      lineHeight: leftIcon.props.size || size * 1.4,
      color: leftIcon.props.color || c,
      pr:
        leftIcon.props.pr ||
        (title || rightIcon ? (leftIcon.props.size || size) / 2 : 0),
    });
  };

  const renderRightIcon = (c) => {
    const {leftIcon, rightIcon, title, size} = props;

    return React.cloneElement(rightIcon, {
      size: rightIcon.props.size || size * 1.4,
      lineHeight: rightIcon.props.size || size * 1.4,
      color: rightIcon.props.color || c,
      pl:
        rightIcon.props.pl ||
        (title || leftIcon ? (rightIcon.props.size || size) / 2 : 0),
    });
  };

  const renderChildren = () => {
    const {
      title,
      size,
      leftIcon,
      rightIcon,
      disabled,
      color,
      backgroundColor,
      disabledBackgroundColor,
      disabledColor,
      transparent,
      bold,
      center,
    } = props;

    const bg = disabled
      ? disabledBackgroundColor
      : backgroundColor || 'primary';
    const fg = disabled ? disabledColor : color;
    const c = transparent ? (color !== getTheme().button.color ? fg : bg) : fg;

    return processing ? (
      <AppView center flex stretch>
        <Indicator color={c} size={size} />
      </AppView>
    ) : (
      <React.Fragment>
        <AppView stertch stertchChildren row flex>
          {leftIcon && renderLeftIcon(c)}
          <AppView stertch center flex>
            <Text size={size} color={c} bold={bold} center={center}>
              {title}
            </Text>
          </AppView>

          {rightIcon ? renderRightIcon(c) : <></>}
        </AppView>
      </React.Fragment>
    );
  };

  const {
    disabledBackgroundColor,
    disabled,
    transparent,
    children,
    style,
    width,
    height,
    ...rest
  } = props;

  const disabledProps = {};
  if (disabled) {
    disabledProps.backgroundColor = disabledBackgroundColor;
    disabledProps.elevation = 0;
    // disabledProps.borderRadius = 0;
  }

  const flatProps = {};
  if (transparent) {
    flatProps.backgroundColor = 'transparent';
    flatProps.elevation = 0;
    // flatProps.borderRadius = 0;
  }
  const overwriteWidth =
    dimensions.layoutReady && dimensions.width && processing && !width;

  const overwriteHeight =
    dimensions.layoutReady && dimensions.height && processing && !height;

  const paddingProps = {};
  if (height) {
    paddingProps.paddingVertical = 0;
  }

  return (
    <TouchableView
      width={width}
      height={height}
      {...rest}
      {...paddingProps}
      {...disabledProps}
      {...flatProps}
      onPress={onPress}
      onLayout={(event) => {
        if (dimensions.layoutReady) {
          return;
        }

        const {width: w, height: h} = event.nativeEvent.layout;

        setDimensions({
          width: w,
          height: h,
          layoutReady: true,
        });
      }}
      flexInnerTouchable={overwriteWidth}
      stretchInnerTouchable={overwriteHeight}
      style={[
        overwriteWidth ? {width: dimensions.width} : null,
        overwriteHeight ? {height: dimensions.height} : null,

        style,
      ]}>
      {children || renderChildren()}
    </TouchableView>
  );
};
Button.defaultProps = {
  row: true,
  center: true,
  onPress: log,
  ...getTheme().button,
};

export default Button;
