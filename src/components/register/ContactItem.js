import React, {useMemo} from 'react';
import {AppButton, AppIcon, AppText} from '../../common';

const ContactItem = ({isSelected, reverse, onPress, title, name, type}) => {
  const color = useMemo(() => {
    return isSelected ? 'white' : 'grey';
  }, [isSelected]);
  return (
    <AppButton
      backgroundColor={isSelected ? 'primary' : 'white'}
      {...{onPress}}
      width={40}>
      <AppIcon {...{reverse}} size={10} {...{name}} {...{type}} {...{color}} />
      <AppText marginHorizontal={2} {...{color}}>
        {title}
      </AppText>
    </AppButton>
  );
};

export default ContactItem;
