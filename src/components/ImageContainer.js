import React from 'react';
import {AppScrollView, AppImage} from '../common';
import Header from './Header';

const ImageContainer = (props) => {
  const {
    children,
    source,
    backHandler,
    header,
    hideBack,
    title,
    showMenu,
    bold,
    color,
    showNotif,
    rightItems,
    linearBackgroundGradient,
    ...rest
  } = props;
  return (
    <AppImage flex stretch source={source}>
      {header && (
        <Header
          {...{color}}
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
    </AppImage>
  );
};

ImageContainer.defaultProps = {
  header: true,
};

export default ImageContainer;
