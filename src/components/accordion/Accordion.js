import React, {useState} from 'react';
import {AppView} from '../../common';
import AccordionItemContainer from './AccordionItemContainer';
import AccordionContext from './AccordionContext';
import Overlay from './Overlay';

const Accordion = ({data, style}) => {
  const [selected, setSelected] = useState(null);
  const value = {selected, setSelected};
  return (
    <AccordionContext.Provider value={value}>
      <AppView stretch {...{style}}>
        {data.map(({title, content}, key) => (
          <AccordionItemContainer
            {...{key}}
            {...{title}}
            {...{content}}
            index={key}
          />
        ))}
        <Overlay />
      </AppView>
    </AccordionContext.Provider>
  );
};

export default Accordion;
