import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// TODO refactor to use my scrollview
// import { ScrollView } from 'react-native';
import {
  PanGestureHandler,
  TapGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';

import View from './View';
import Text from './Text';
import Button from './Button';
import {Animated, Dimensions, StyleSheet} from 'react-native';
import Theme from './defaults/theme';
import {responsiveHeight} from './utils/responsiveDimensions';

const styles = StyleSheet.create({
  rtl: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
});

const floatEpsilon = 2 ** -23;
function equal(a, b) {
  return Math.abs(a - b) <= floatEpsilon * Math.max(Math.abs(a), Math.abs(b));
}

class Swiper extends Component {
  static propTypes = {
    vertical: PropTypes.bool,
    indicatorColor: PropTypes.string,
    indicatorActiveColor: PropTypes.string,
  };

  static defaultProps = {
    vertical: false,
    indicatorColor: Theme.swiper.indicatorColor,
    indicatorActiveColor: Theme.swiper.indicatorActiveColor,
  };

  constructor(props) {
    super(props);

    this.scrollRef = React.createRef();

    this.state = {
      width: 0,
      height: 0,
      selectedPage: 0,
      layout: false,
    };

    this.scrollState = 0;
  }

  onScrollBeginDrag = (event) => {
    const e = event.nativeEvent;
    const {vertical} = this.props;

    const {[vertical ? 'height' : 'width']: base} = e.layoutMeasurement;

    this.base = base;
    this.scrollState = 1;
  };

  onScroll = (event) => {
    const e = event.nativeEvent;
    const {vertical} = this.props;

    const {[vertical ? 'y' : 'x']: offset} = e.contentOffset;

    this.progress = offset / this.base;
    const discreteProgress = Math.round(this.progress);

    if (!this.scrollState && equal(discreteProgress, this.progress)) {
      this.onScrollEnd(discreteProgress);
    }
  };

  onScrollEndDrag = (event) => {
    this.scrollState = 0;
  };

  onScrollEnd = (page) => {
    this.setState({
      selectedPage: page,
    });
    this.props.onScrollEnd && this.props.onScrollEnd(page);
  };

  onContainerLayout = (event) => {
    const {width, height} = event.nativeEvent.layout;
    this.setState({
      width,
      height,
      layout: true,
    });
  };

  scrollTo = (pos) => {
    this.scrollRef.current.scrollTo(pos);
  };

  scrollToPage = (p, animated = true) => {};

  renderIndicators = (num) => {
    const containerWidth = this.state.width;
    const containerHeight = this.state.height * 0.1;
    const containerDiameter = Math.sqrt(
      containerWidth * containerWidth + containerHeight * containerHeight,
    );

    const dots = Array.from(new Array(num), (page, index) => {
      const selected = this.state.selectedPage === index;
      const selectedProps = {
        circleRadius: containerDiameter * 0.01,
        opacity: 0.5,
        center: true,
      };
      return (
        <View {...(selected ? selectedProps : {})}>
          <View
            key={String(index)}
            circle
            circleRadius={containerDiameter * 0.0045}
            backgroundColor={
              selected
                ? this.props.indicatorActiveColor
                : this.props.indicatorColor
            }
            marginHorizontal={containerDiameter * 0.006}
          />
        </View>
      );
    });

    return (
      <View
        row
        center
        style={{
          position: 'absolute',
          bottom: responsiveHeight(2),
          width: this.state.width,
          height: this.state.height * 0.1,
        }}>
        {dots}
      </View>
    );
  };

  renderScrollView = (pages) => {
    const {vertical, rtl} = this.props;

    return (
      <ScrollView
        // {...this.props}
        ref={this.scrollRef}
        horizontal={!vertical}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        pagingEnabled
        scrollsToTop={false}
        bounces={false}
        automaticallyAdjustContentInsets={false}
        style={rtl && !vertical ? styles.rtl : null}
        // decelerationRate="fast"
        // decelerationRate={0}
        // scrollEventThrottle={1}
        onScrollBeginDrag={this.onScrollBeginDrag}
        onScroll={this.onScroll}
        onScrollEndDrag={this.onScrollEndDrag}>
        {pages}
      </ScrollView>
    );
  };

  render() {
    const {
      width,
      height,
      flex,
      stretch,
      backgroundColor,
      children,
      rtl,
      vertical,
    } = this.props;

    const pagesKey = Object.keys(children);

    const pages = pagesKey.map((page, i) => (
      <View
        key={String(i)}
        style={[
          rtl && !vertical ? styles.rtl : null,
          {width: this.state.width, height: this.state.height},
        ]}>
        {children[page]}
      </View>
    ));

    return (
      <View
        width={width}
        height={height}
        flex={flex}
        stretch={stretch}
        backgroundColor={backgroundColor}
        onLayout={this.onContainerLayout}>
        {this.renderScrollView(pages)}
        {this.renderIndicators(pagesKey.length)}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(Swiper);
