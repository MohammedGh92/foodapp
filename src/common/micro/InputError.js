import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import posed from 'react-native-pose';

import AppText from '../Text';
import {getTheme} from '../Theme';

import {moderateScale} from '../utils/responsiveDimensions';

const config_ltr = {
  visible: {x: 0, opacity: 1},
  hidden: {x: -50, opacity: 0},
};

const config_rtl = {
  visible: {x: 0, opacity: 1},
  hidden: {x: 50, opacity: 0},
};

const BoxLTR = posed.View(config_ltr);
const BoxRTL = posed.View(config_rtl);

class InputError extends PureComponent {
  static propTypes = {
    size: PropTypes.number,
    sizeScale: PropTypes.number,
    error: PropTypes.string,
    rtl: PropTypes.bool,
    color: PropTypes.string,
  };

  static defaultProps = {
    ...getTheme().inputError,
    errorTextMarginHorizontal: 5,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: props.error,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.error !== nextProps.error) {
      this.setState({
        error: nextProps.error,
      });
    }
  }

  render() {
    const Box = this.props.rtl ? BoxRTL : BoxLTR;
    const {
      errorTextMarginHorizontal,
      errorTextMarginBottom,
      errorTextMarginVertical,
      center,
    } = this.props;

    return (
      <Box
        style={[
          {
            marginTop: moderateScale(1),
            marginBottom: errorTextMarginBottom
              ? moderateScale(2)
              : moderateScale(5),
          },
          center
            ? {
                alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',
              }
            : {},
        ]}
        pose={this.props.error ? 'visible' : 'hidden'}>
        <AppText
          marginVertical={errorTextMarginVertical}
          marginHorizontal={errorTextMarginHorizontal}
          color={this.props.color}
          size={this.props.size * this.props.sizeScale}
          height={this.props.textErrorHeight ? this.props.textErrorHeight : 3}>
          {this.state.error}
        </AppText>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(InputError);
