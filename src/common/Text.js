import React, {useMemo} from 'react';
import {Text as NativeText} from 'react-native';
import {convertNumbers} from './utils/numbers';
import useCommonStyles from './utils/useCommonStyles';
import useTextStyles from './utils/useTextStyles';
import {getTheme} from './Theme';

const Text = (props) => {
  const {rtl, children, style, translateNumbers, ...rest} = props;
  const commonStyles = useCommonStyles(rest);
  const textStyles = useTextStyles(rest, children);
  return useMemo(() => {
    return (
      <NativeText {...rest} style={[commonStyles, textStyles, style]}>
        {convertNumbers(children, translateNumbers ? rtl : false)}
      </NativeText>
    );
  }, [rest, commonStyles, textStyles, style, children, translateNumbers, rtl]);
};

Text.defaultProps = {
  ...getTheme().text,
};
export default Text;
