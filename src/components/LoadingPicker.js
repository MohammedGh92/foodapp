import React, {useCallback, useEffect, useState} from 'react';
import Picker from './Picker';
const LoadingPicker = ({provider, param, ...rest}) => {
  const [content, setContent] = useState({
    data: [],
    isLoading: true,
  });
  useEffect(() => {
    getData(param);
  }, [getData, param]);
  const getData = useCallback(
    async (par) => {
      setContent((prev) => ({...prev, isLoading: true}));
      if (provider) {
        const data = await provider(par);

        setContent({
          data,
          isLoading: false,
        });
      } else {
        setContent((prev) => ({...prev, isLoading: false}));
      }
    },
    [provider],
  );
  return (
    <Picker
      marginVertical={5}
      processing={content.isLoading}
      label="name"
      value="id"
      data={content.data}
      {...rest}
    />
  );
};

export default LoadingPicker;
