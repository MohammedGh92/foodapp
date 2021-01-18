import React, {PureComponent} from 'react';
import {TextInput as NativeInput} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  BasePropTypes,
  dimensionsStyles,
  paddingStyles,
  fontSizeStyles,
  fontFamilyStyles,
  textDirectionStyles,
  colorStyles,
  borderStyles,
  borderRadiusStyles,
  backgroundColorStyles,
  elevationStyles,
} from './Base';
import {isASCII} from './utils/text';
import View from './View';
import InputError from './micro/InputError';
import {getTheme} from './Theme';
import {convertNumbers} from './utils/numbers';

class TextArea extends PureComponent {
  static propTypes = {
    ...BasePropTypes,
    initialValue: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    placeholder: PropTypes.string,
    placeholderColor: PropTypes.string,
    error: PropTypes.string,
    noValidation: PropTypes.bool,
  };

  state = {
    isTouched: false,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.reset !== this.props.reset) {
      this.clear();
    }

    if (nextProps.error && !this.state.isTouched) {
      this.setState({
        isTouched: true,
      });
    }
  }

  static defaultProps = {
    ...getTheme().textArea,
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      text: props.initialValue,
    };
  }

  onChangeText = (text, noValidate) => {
    const {name, onChange} = this.props;

    this.setState({
      text,
    });

    if (onChange) {
      if (name) {
        onChange(name, text, !this.state.isTouched || noValidate);
      } else {
        onChange(text);
      }
    }
  };

  onBlur = () => {
    const {name, onBlur} = this.props;

    if (onBlur) {
      if (name) {
        onBlur(name, this.state.text);
      } else {
        onBlur(this.state.text);
      }
    }
  };

  onFocus = () => {
    const {name, onFocus} = this.props;

    if (onFocus) {
      if (name) {
        onFocus(name, this.state.text);
      } else {
        onFocus(this.state.text);
      }
    }
    this.setState({isTouched: true});
  };

  onSubmitEditing = () => {
    const {name, onSubmitEditing} = this.props;

    if (onSubmitEditing) {
      if (name) {
        onSubmitEditing(name, this.state.text);
      } else {
        onSubmitEditing(this.state.text);
      }
    }
  };

  focus = () => {
    this.inputRef.current.focus();
  };

  blur = () => {
    this.inputRef.current.blur();
  };

  clear = () => {
    this.inputRef.current.clear();
    this.onChangeText('', true);
  };
  getColor = () => {
    const {borderColor} = this.props;
    if (this.props.error) {
      return '#FF0050';
    }

    return borderColor;
  };

  render() {
    const {
      placeholder,
      placeholderColor,
      rtl,
      translateNumbers,
      noValidation,
      error,
      size,
      flex,
      margin,
      marginHorizontal,
      marginVertical,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      underlineColor,
      maxLength,
      returnKeyType,
      editable,
    } = this.props;
    const assignedColor = this.getColor();
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
        marginRight={marginRight}>
        <NativeInput
          ref={this.inputRef}
          maxLength={maxLength}
          // {...rest}
          placeholder={convertNumbers(
            placeholder,
            translateNumbers ? rtl : false,
          )}
          returnKeyType={returnKeyType || 'done'}
          placeholderTextColor={placeholderColor}
          multiline
          blurOnSubmit
          editable={editable}
          value={this.state.text}
          underlineColorAndroid={underlineColor}
          onChangeText={this.onChangeText}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onSubmitEditing={this.onSubmitEditing}
          style={[
            dimensionsStyles(this.props),
            backgroundColorStyles(this.props),
            textDirectionStyles(this.props),
            fontSizeStyles(this.props),
            fontFamilyStyles(this.props),
            colorStyles(this.props),
            borderStyles(this.props),
            borderRadiusStyles(this.props),
            elevationStyles(this.props),
            {
              alignSelf: 'stretch',
              textAlignVertical: 'top',
              padding: 0,
              writingDirection: isASCII(this.state.text) ? 'ltr' : 'rtl',

              borderTopColor: assignedColor,
              borderBottomColor: assignedColor,
              borderLeftColor: assignedColor,
              borderRightColor: assignedColor,
            },
            paddingStyles(this.props),
          ]}
        />
        {!noValidation ? (
          error ? (
            <InputError error={error} size={size} />
          ) : null
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps, null, null, {forwardRef: true})(
  TextArea,
);
