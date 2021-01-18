import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import {
  BasePropTypes,
  paddingStyles,
  fontSizeStyles,
  fontFamilyStyles,
  textDirectionStyles,
  colorStyles,
} from './Base';

import View from './View';
import TouchableView from './TouchableView';

import Icon from './Icon';
import Text from './Text';
import {getTheme} from './Theme';
import InputError from './micro/InputError';
import {convertNumbers} from './utils/numbers';
import BlockingView from '../components/BlockingView';

class DatePicker extends PureComponent {
  static propTypes = {
    // ...BasePropTypes,
    initialValue: PropTypes.string,
    name: PropTypes.string,
    // onChangeText: PropTypes.func,
    // onBlur: PropTypes.func,
    // onFocus: PropTypes.func,
    // onSubmitEditing: PropTypes.func,
    placeholder: PropTypes.string,
    placeholderColor: PropTypes.string,
    // secure: PropTypes.bool,
    leftItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    rightItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    // activeColor: PropTypes.string,
    // inactiveColor: PropTypes.string,
    color: PropTypes.string,
    error: PropTypes.string,
    // showSecureEye: PropTypes.bool,
    nextInput: PropTypes.objectOf(PropTypes.any),
    noValidation: PropTypes.bool,
  };

  static defaultProps = {
    leftItems: [],
    rightItems: [],
    ...getTheme().datePicker,
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      value: props.initialValue || props.placeholder,
      valueSet: !!props.initialValue,
      isDateTimePickerVisible: false,
      // text: props.initialValue,
      // color: props.color || props.inactiveColor,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.reset !== this.props.reset) {
  //     this.clear();
  //   }
  // }

  showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

  hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  handleDatePicked = (date) => {
    const {name, onSelect} = this.props;
    const foramtedDate = this.props.momentFormat
      ? moment(date).locale('en').format(this.props.momentFormat)
      : date;
    this.setState({
      value: date,
      valueSet: true,
    });

    this.hideDateTimePicker();
    this.hideDateTimePicker();
    if (onSelect) {
      if (name) {
        onSelect(name, foramtedDate);
      } else {
        onSelect(foramtedDate);
      }
    }
  };

  clear = () => {
    const {name, onSelect} = this.props;

    this.setState({
      value: this.props.initialValue || this.props.placeholder,
      valueSet: false,
    });

    this.hideDateTimePicker();
    if (onSelect) {
      if (name) {
        onSelect(name, '');
      } else {
        onSelect('');
      }
    }
  };

  renderItems = (items) => {
    const {size, color} = this.props;

    const nodes = items.map((item) => {
      if (
        item.type.WrappedComponent &&
        (item.type.WrappedComponent.displayName === 'Button' ||
          item.type.WrappedComponent.displayName === 'Icon')
      ) {
        return React.cloneElement(item, {
          key: String(Math.random()),
          transparent: true,
          stretch: true,
          color: item.props.color || color,
          size: item.props.size || size * 1.5,
          backgroundColor: 'transparent',
          ph: item.props.ph || size / 1.5,
          pv: 0,
        });
      }
      return React.cloneElement(item, {
        key: String(Math.random()),
      });
    });

    return nodes;
  };

  renderErrorIcon = () => (
    <Icon
      color="red"
      name="error-outline"
      type="material"
      // onPress={this.focus}
      marginHorizontal={2}
      size={7}
    />
  );
  render() {
    const {
      size,
      color,
      placeholderColor,
      width,
      height,
      backgroundColor,
      borderRadius,
      elevation,
      rtl,
      nextInput,
      placeholder,
      translateNumbers,
      noValidation,
      error,
      flex,
      margin,
      marginHorizontal,
      marginVertical,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      borderWidth,
      borderTopWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderRightWidth,
      borderColor,
      borderTopColor,
      borderBottomColor,
      presentationFormat,
      borderLeftColor,
      borderRightColor,
      padding,
      paddingVertical,
      paddingHorizontal,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      showDropArrow,
      mode,
      isEditable,
      ...rest
    } = this.props;

    let {leftItems, rightItems} = this.props;

    if (leftItems && !leftItems.map) {
      leftItems = [leftItems];
    }
    if (rightItems && !rightItems.map) {
      rightItems = [rightItems];
    }

    return (
      <View
        stretch
        flex={flex}
        margin={margin}
        marginHorizontal={marginHorizontal}
        marginVertical={marginVertical}
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        width={width}>
        <View
          stretch
          row
          height={height}
          backgroundColor={backgroundColor}
          borderRadius={borderRadius}
          elevation={elevation}
          borderWidth={borderWidth}
          borderTopWidth={borderTopWidth}
          borderBottomWidth={borderBottomWidth}
          borderLeftWidth={borderLeftWidth}
          borderRightWidth={borderRightWidth}
          borderColor={borderColor}
          borderTopColor={borderTopColor}
          borderBottomColor={borderBottomColor}
          borderLeftColor={borderLeftColor}
          borderRightColor={borderRightColor}>
          {leftItems.length ? this.renderItems(leftItems) : null}

          <TouchableView
            touchableOpacity
            flex
            stretch
            row
            onPress={this.showDateTimePicker}
            padding={padding}
            paddingVertical={paddingVertical}
            paddingHorizontal={paddingHorizontal}
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
            paddingLeft={paddingLeft}
            paddingRight={paddingRight}
            spaceBetween={showDropArrow}>
            <Text
              color={this.state.valueSet ? color : placeholderColor}
              size={size}
              marginHorizontal={3}>
              {this.state.valueSet
                ? this.props.presentationFormat
                  ? moment(this.state.value)
                      .locale('en')
                      .format(this.props.presentationFormat)
                  : this.props.momentFormat
                  ? moment(this.state.value)
                      .locale('en')
                      .format(this.props.momentFormat)
                  : this.state.value
                : this.state.value}
            </Text>

            {showDropArrow ? (
              <Icon name="arrow-dropdown" color={color} size={size * 1.3} />
            ) : null}
          </TouchableView>
          {error && this.renderErrorIcon()}
          {rightItems.length ? (
            <View stretch centerY>
              {this.renderItems(rightItems)}
            </View>
          ) : null}
        </View>
        {!noValidation ? <InputError error={error} size={size} /> : null}

        <DateTimePicker
          date={this.state.valueSet ? new Date(this.state.value) : undefined}
          format="DD-MM-YYYY"
          maximumDate={
            this.props.maxDate ? new Date(this.props.maxDate) : undefined
          }
          minimumDate={
            this.props.minDate ? new Date(this.props.minDate) : undefined
          }
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          // locale="az-Arab"
          mode={mode || 'datetime'}
        />
        {this.state.isDateTimePickerVisible && <Text />}
        {!isEditable && <BlockingView />}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(DatePicker);
