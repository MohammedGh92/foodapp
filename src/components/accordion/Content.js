import React, {useState} from 'react';
import AccordionItem from './AccordionItem';
import {AppView} from '../../common';

const Content = ({content, transition}) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [isContentReady, setIsContentReady] = useState(false);

  const onLayout = ({nativeEvent}) => {
    if (maxHeight === 0) {
      setMaxHeight(nativeEvent.layout.height);
      setIsContentReady(true);
    }
  };
  if (isContentReady) {
    return (
      <AccordionItem {...{content}} {...{transition}} listHeight={maxHeight} />
    );
  }
  return (
    <AppView stretch centerY onLayout={onLayout}>
      {content}
    </AppView>
  );
};

export default Content;
