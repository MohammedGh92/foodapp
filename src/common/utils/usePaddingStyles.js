import {useMemo} from 'react';
import {paddingStyles} from '../Base';

const usePaddingStyles = props => {
  const memoizedPaddingStyles = useMemo(() => {
    if (props) {
      return paddingStyles(props);
    }
    return {};
  }, [props]);

  return memoizedPaddingStyles;
};

export default usePaddingStyles;
