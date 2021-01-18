import {getColors} from '../Theme';

export const getThemeColor = color => {
  for (let c of Object.keys(getColors())) {
    if (color === c) {
      return getColors()[c];
    }
  }

  return color;
};
