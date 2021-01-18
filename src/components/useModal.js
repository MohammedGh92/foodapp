import {useState, useEffect, useCallback} from 'react';

const useModal = (ref) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    ref.current = {show, hide};
  }, [hide, ref, show]);
  const show = useCallback(() => {
    setIsVisible(true);
  }, []);
  const hide = useCallback((onHide) => {
    setIsVisible(false);
    if (onHide) {
      onHide();
    }
  }, []);
  const changeState = useCallback((v) => {
    setIsVisible(v);
  }, []);

  return [isVisible, changeState, show, hide];
};

export default useModal;
