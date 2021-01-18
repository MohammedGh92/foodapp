import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getIconType, getIconSizeScaleFix} from './utils/icon';
import {getTheme} from './Theme';
import {responsiveFontSize} from './utils/responsiveDimensions';

import {
  BasePropTypes,
  fontSizeStyles,
  colorStyles,
  backgroundColorStyles,
  borderRadiusStyles,
  paddingStyles,
  marginStyles,
  elevationStyles,
  selfLayoutStyles,
  borderStyles,
} from './Base';

class Icon extends PureComponent {
  static propTypes = {
    ...BasePropTypes,
    type: PropTypes.string,
    name: PropTypes.string,
    flip: PropTypes.bool,
  };

  static defaultProps = {
    ...getTheme().icon,
  };

  flipDirectionStyles = () => {
    const {flip, reverse, rtl} = this.props;

    if ((flip && rtl) || (reverse && !rtl)) {
      return {
        transform: [{scaleX: -1}],
      };
    }

    return null;
  };

  render() {
    const {type, name, style, ...rest} = this.props;
    const NativeIcon = getIconType(type);

    return (
      <NativeIcon
        {...rest}
        name={name}
        style={[
          this.flipDirectionStyles(),
          selfLayoutStyles(this.props),
          fontSizeStyles(this.props, getIconSizeScaleFix(type)),
          colorStyles(this.props),
          backgroundColorStyles(this.props),
          borderRadiusStyles(this.props),
          borderStyles(this.props),
          paddingStyles(this.props),
          marginStyles(this.props),
          elevationStyles(this.props),
          style,
          {
            textAlignVertical: 'center',
            textAlign: 'center',
          },
          this.props.lineHeight
            ? {
                lineHeight: responsiveFontSize(this.props.lineHeight),
              }
            : {},
        ]}
      />
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(Icon);
