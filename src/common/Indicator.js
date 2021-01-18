import React, {PureComponent} from 'react';
import {ActivityIndicator, Platform} from 'react-native';
import PropTypes from 'prop-types';

import {responsiveFontSize, moderateScale} from './utils/responsiveDimensions';
import {getThemeColor} from './utils/colors';
import {getTheme} from './Theme';

// TODO add customize types and shapes
// TODO insure all activityindicators are removed
export default class Indicator extends PureComponent {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
  };

  static defaultProps = {
    ...getTheme().indicator,
  };

  render() {
    const {color, marginVertical, marginHorizontal, style} = this.props;
    let {size} = this.props;
    if (Platform.OS === 'ios') {
      size = 'small';
    } else {
      size = responsiveFontSize(size);
    }

    return (
      <ActivityIndicator
        size={size}
        color={getThemeColor(color)}
        style={[
          style,
          {
            marginVertical: moderateScale(marginVertical) || 0,
            marginHorizontal: moderateScale(marginHorizontal) || 0,
          },
        ]}
      />
    );
  }
}
