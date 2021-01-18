import React from 'react';
import { AppView, AppText, AppInput } from '../common';

const Field = ({ title, color, ...rest }) => {
  return (
    <AppView center marginVertical={3} stretch>
      {title &&
        <AppText marginVertical={3} color={color || '#000'} bold>
          {title}
        </AppText>
      }
      <AppInput borderWidth={0.3}  {...rest} />
    </AppView>
  );
};

export default Field;
