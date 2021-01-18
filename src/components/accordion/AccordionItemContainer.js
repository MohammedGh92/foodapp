import React, {useState, useContext, useEffect, useCallback} from 'react';
import {AppView} from '../../common';
import {useTransition, bin} from 'react-native-redash';
import Animated, {Easing} from 'react-native-reanimated';
import AccordionContext from './AccordionContext';
import Title from './Title';
import Content from './Content';
const {not} = Animated;
const AccordionItemContainer = ({title, content, index, autoClose}) => {
  const accordion = useContext(AccordionContext);

  const [open, setOpen] = useState(false);
  const transition = useTransition(
    open,
    not(bin(open)),
    bin(open),
    100,
    Easing.inOut(Easing.ease),
  );

  const toggleAccordion = useCallback(() => {
    setOpen((prev) => !prev);
    accordion.setSelected(index);
  }, [accordion, index]);

  useEffect(() => {
    if (accordion.selected !== index && autoClose) {
      setOpen(false);
    }
  }, [accordion.selected, autoClose, index]);
  return (
    <AppView stretch>
      <Title
        {...{transition}}
        {...{title}}
        {...{open}}
        {...{toggleAccordion}}
      />

      <Content {...{content}} {...{transition}} />
    </AppView>
  );
};

AccordionItemContainer.defaultProps = {
  autoClose: true,
};

export default AccordionItemContainer;
