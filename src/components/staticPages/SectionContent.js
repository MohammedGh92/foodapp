import React from 'react';
import {AppText} from '../../common';
import HTML from 'react-native-render-html';
import { Dimensions } from 'react-native';
const SectionContent = ({content, ...rest}) => {
  return (
    <HTML html={content} imagesMaxWidth={Dimensions.get('window').width} />
  );
};
export default SectionContent;
