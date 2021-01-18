import React from 'react';
import {AppView, AppScrollView} from '../common';
import Header from './Header';

const ScrollableContainer = (props) => {
  const {
    backHandler,
    header,
    hideBack,
    title,
    showMenu,
    bold,
    children,
    showNotif,
    rightItems,
    linearBackgroundGradient,
    ...rest
  } = props;
  return (
    <AppView flex stretch>
      {header && (
        <Header
          {...{showNotif}}
          {...{bold}}
          {...{backHandler}}
          {...{hideBack}}
          {...{showMenu}}
          {...{title}}
          {...{rightItems}}
          {...{linearBackgroundGradient}}
        />
      )}
      <AppScrollView {...rest} flex stretch>
        {children}
      </AppScrollView>
    </AppView>
  );
};

ScrollableContainer.defaultProps = {
  header: true,
};

export default ScrollableContainer;
