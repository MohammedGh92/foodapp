import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView as NativeScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';

import {
  BasePropTypes,
  dimensionsStyles,
  selfLayoutStyles,
  childrenLayoutStyles,
  backgroundColorStyles,
  paddingStyles,
  marginStyles,
  borderStyles,
} from './Base';

const styles = StyleSheet.create({
  rtl: {
    transform: [{scaleX: -1}],
  },
});

class ScrollView extends PureComponent {
  static propTypes = {
    ...BasePropTypes,
    horizontal: PropTypes.bool,
  };

  static defaultProps = {
    showVIndicator: false,
    showHIndicator: false,
    // avoidPadding: 20,
  };

  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  render() {
    const {
      horizontal,
      flattenChildren,
      flexGrow,
      rtl,
      style,
      contentStyle,
      row,
      showVIndicator,
      showHIndicator,
      avoidPadding,
      ...rest
    } = this.props;
    let {children} = this.props;
    if (children && !Array.isArray(children)) {
      children = [children];
    }

    if (flattenChildren) {
      children = children.reduce((acc, item) => acc.concat(item), []);
    }

    const h = horizontal || row;

    const main_node = (
      <NativeScrollView
        ref={this.ref}
        {...rest}
        showsVerticalScrollIndicator={showVIndicator}
        showsHorizontalScrollIndicator={showHIndicator}
        horizontal={horizontal}
        alwaysBounceVertical={!h}
        nestedScrollEnabled
        right={null}
        left={null}
        flex={null}
        style={[
          dimensionsStyles(rest),
          selfLayoutStyles(rest),
          backgroundColorStyles(rest),
          borderStyles(rest),
          marginStyles({...rest, row: h}),
          rtl && h ? styles.rtl : null,
          style,
        ]}
        contentContainerStyle={[
          !horizontal && childrenLayoutStyles(rest),
          paddingStyles({...rest, row: h}),
          flexGrow && {flexGrow: 1},
          contentStyle,
        ]}>
        {React.Children.map(children, (child) =>
          child
            ? React.cloneElement(child, {
                style: [
                  Object.getDeepProp(child, 'props.style'),
                  rtl && h ? styles.rtl : {},
                ],
              })
            : child,
        )}
      </NativeScrollView>
    );

    if (Platform.OS === 'ios' && !h) {
      return (
        <KeyboardAvoidingView
          style={{alignSelf: 'stretch', flex: 1}}
          // behavior="position"
          behavior="padding"
          enabled>
          {main_node}
        </KeyboardAvoidingView>
      );
    }

    return (
      <KeyboardAvoidingView
        style={{alignSelf: 'stretch', flex: 1, paddingBottom: avoidPadding}}
        behavior="height"
        enabled>
        {main_node}
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps, null, null, {forwardRef: true})(
  ScrollView,
);
