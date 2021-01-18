import React, {useCallback} from 'react';
import {CheckBoxGroup, AppCheckBox} from '../../common';

const CheckBox = ({data, onSelect, initialValue}) => {
  const onChange = useCallback(
    (values) => {
      onSelect(values);
    },
    [onSelect],
  );
  return (
    <CheckBoxGroup {...{initialValue}} {...{onChange}} margin={10}>
      {data &&
        data.map((item) => (
          <AppCheckBox
            // marginVertical={5}
            key={item.id}
            label={item.name}
            value={item.id}
          />
        ))}
    </CheckBoxGroup>
  );
};

export default CheckBox;
