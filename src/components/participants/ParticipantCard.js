import React from 'react';
import {APP_BASE_URL} from '../../api/utils/urls';
import {AppButton, AppImage, AppText, AppView} from '../../common';

const ParticipantCard = ({partcpant, imageSize, textSize}) => {
  console.log(partcpant, 'partcpant');
  return (
    <AppView marginVertical={3} stretch row>
      <AppImage
        equalSize={imageSize}
        source={{uri: `${APP_BASE_URL}${partcpant.image}`}}
      />
      <AppView marginHorizontal={10}>
        <AppText size={textSize} color="black">
          {partcpant.name}
        </AppText>
        {/* <AppText>مكان الاقامه</AppText> */}
      </AppView>
    </AppView>
  );
};

ParticipantCard.defaultProps = {
  imageSize: 18,
  textSize: 8,
};
export default ParticipantCard;
