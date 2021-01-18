import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image as NativeImage,
  ImageBackground as NativeImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';

import ImageViewer from '../components/ImageViewer';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';

import View from './View';
import Text from './Text';
import Icon from './Icon';
import Indicator from './Indicator';

import { getTheme } from './Theme';

import {
  BasePropTypes,
  dimensionsStyles,
  borderRadiusStyles,
  selfLayoutStyles,
} from './Base';

const styles = StyleSheet.create({
  fetchingStatusContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    opacity: 0.8,
  },
});

class Image extends PureComponent {
  static propTypes = {
    ...BasePropTypes,
    isConnected: PropTypes.bool,
    source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    resizeMode: PropTypes.string,
    progressColor: PropTypes.string,
    errorColor: PropTypes.string,
    errorBackgroundColor: PropTypes.string,
  };

  static defaultProps = {
    ...getTheme().image,
  };

  constructor(props) {
    super(props);
    this.imageViewer = React.createRef();
    let localImg = true;
    if (
      typeof props.source === 'object' &&
      Platform.OS === 'ios' &&
      props.source.uri &&
      props.source.uri.startsWith('assets-library://')
    ) {
      localImg = undefined;
    }

    this.state = {
      status: localImg ? 'end' : 'initial',
      error: null,
      progress: 0,
      localImg,
    };

    this.resizeModes = {
      contain: FastImage.resizeMode.contain,
      cover: FastImage.resizeMode.cover,
      stretch: FastImage.resizeMode.stretch,
      center: FastImage.resizeMode.center,
    };

    this.diameter = 0;
    if (props.circleRadius) {
      this.diameter = props.circleRadius;
    } else if (props.equalSize) {
      this.diameter = props.equalSize;
    } else if (props.width && props.height) {
      this.diameter = Math.sqrt(props.width * props.height);
    }
  }

  componentDidMount = () => {
    if (this.state.localImg) {
      return;
    }

    this.timer = setTimeout(() => {
      if (this.state.status === 'initial') {
        this.setState({
          status: 'loading',
        });
        clearTimeout(this.timer);
      }
    }, 150);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.source === 'object' &&
      Platform.OS === 'ios' &&
      nextProps.source.uri &&
      nextProps.source.uri.startsWith('assets-library://')
    ) {
      this.setState({
        localImg: false,
      });
    } else if (
      typeof nextProps.source === 'object' &&
      Platform.OS === 'ios' &&
      nextProps.source.uri
    ) {
      this.setState({
        localImg: false,
      });
    }
  }

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  renderImageFetchingStatus = () => {
    if (!this.props.source || (this.props.source && !this.props.source.uri)) {
      return null;
    }
    if (!(this.state.status !== 'end' || this.state.error)) {
      return null;
    }

    const {
      progressColor,
      errorColor,
      errorBackgroundColor,
      isConnected,
    } = this.props;

    return (
      <View
        center
        backgroundColor={this.state.error ? errorBackgroundColor : null}
        style={styles.fetchingStatusContainer}>
        {!this.state.error && this.state.status === 'loading' ? (
          <Indicator size={this.diameter / 5} color={progressColor} />
        ) : null}
        {!this.state.error && this.state.status === 'inProgress' ? (
          <Indicator size={this.diameter / 3} color={progressColor} />
        ) : null}
        {this.state.error ? (
          <React.Fragment>
            <Icon
              name={isConnected ? 'image' : 'wifi-off'}
              type={isConnected ? 'entypo' : 'feather'}
              size={this.diameter / 2.5}
              color={errorColor}
            />
            <Text color={errorColor} size={this.diameter / 8} center>
              {!this.props.isConnected
                ? I18n.t('ui-networkConnectionError')
                : I18n.t('ui-couldNotLoadImage')}
            </Text>
          </React.Fragment>
        ) : null}
      </View>
    );
  };

  render() {
    const {
      children,
      source,
      resizeMode,
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
      padding,
      paddingHorizontal,
      paddingVertical,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      placeholder,
      data,
      onPress,
      imageViewer,
      ...rest
    } = this.props;

    const ImageComponent = this.state.localImg
      ? children
        ? NativeImageBackground
        : NativeImage
      : FastImage;

    const Container =
      onPress || imageViewer ? TouchableOpacity : React.Fragment;

    const containerProps =
      onPress || imageViewer
        ? {
          onPress: imageViewer
            ? () => this.imageViewer.current.toggleModal(true)
            : onPress,
        }
        : {};

    return (
      <View {...rest} onPress={null} pt={0} pb={0} pl={0} pr={0} center>
        {placeholder ? null : this.renderImageFetchingStatus()}
        <Container {...containerProps}>
          <ImageComponent
            style={[
              dimensionsStyles(this.props),
              borderRadiusStyles(this.props),
              selfLayoutStyles(this.props),
            ]}
            source={source}
            resizeMode={this.resizeModes[resizeMode]}
            onProgress={(e) => {
              if (this.props.onProgress) {
                this.props.onProgress(e);
              }
              this.setState({
                status: 'inProgress',
                progress: Math.round(
                  (e.nativeEvent.loaded / e.nativeEvent.total) * 100,
                ),
              });
            }}
            onError={(error) => {
              this.setState({
                error,
              });
            }}
            onLoad={() => {
              this.setState({
                error: null,
              });
            }}
            onLoadEnd={() => {
              if (this.props.onLoadEnd) {
                this.props.onLoadEnd();
              }
              this.setState({
                status: 'end',
              });
            }}>
            {children ? (
              <View
                flex
                stretch
                row={row}
                top={top}
                bottom={bottom}
                centerY={centerY}
                left={left}
                right={right}
                centerX={centerX}
                center={center}
                stretchChildren={stretchChildren}
                spaceBetween={spaceBetween}
                spaceAround={spaceAround}
                {...{ reverse }}
                {...{ padding }}
                {...{ paddingVertical }}
                {...{ paddingHorizontal }}
                {...{ paddingTop }}
                {...{ paddingBottom }}
                {...{ paddingLeft }}
                {...{ paddingRight }}>
                {children}
              </View>
            ) : null}
          </ImageComponent>
        </Container>
        {imageViewer && (
          <ImageViewer ref={this.imageViewer} data={data || [source]} />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
  isConnected: state.network.isConnected,
});

export default connect(mapStateToProps)(Image);
