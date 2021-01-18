import React,{useEffect} from 'react';
import { AppText, AppView, AppIcon } from '../../common';
import { CustomAppReview } from '..';

const RatingTab = (props) => {


  return (
    <AppView backgroundColor='white' flexGrow width={90}>
      {props.data.map((item, index) => (
        <CustomAppReview item={item} />
      ))}
    </AppView>
  );
};

export default RatingTab;