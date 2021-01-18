import {useMemo} from 'react';
import {childrenLayoutStyles} from '../Base';
import {useSelector} from 'react-redux';

const useChildrenStyles = props => {
  const {
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
    wrap,
  } = props;
  const rtl = useSelector(state => state.lang.rtl);
  const memoizedChildrenLayoutStyles = useMemo(() => {
    if (
      row ||
      top ||
      bottom ||
      centerY ||
      left ||
      right ||
      centerX ||
      center ||
      stretchChildren ||
      spaceBetween ||
      spaceAround ||
      reverse ||
      wrap ||
      rtl
    ) {
      return childrenLayoutStyles({
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
        wrap,
        rtl,
      });
    }
    return {};
  }, [
    bottom,
    center,
    centerX,
    centerY,
    left,
    reverse,
    right,
    row,
    rtl,
    spaceAround,
    spaceBetween,
    stretchChildren,
    top,
    wrap,
  ]);

  return memoizedChildrenLayoutStyles;
};

export default useChildrenStyles;
