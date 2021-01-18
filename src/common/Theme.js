import defaultColors from './defaults/colors';
import defaultTheme from './defaults/theme';
import defaultFonts from './defaults/fonts';

global.UIColors = global.UIColors || defaultColors;
global.UITheme = global.UITheme || defaultTheme;
global.UIFonts = global.UIFonts || defaultFonts;

export const getColors = () => global.UIColors;

export const getColor = (c) => global.UIColors[c];

export const getTheme = () => global.UITheme;

export const getFonts = () => global.UIFonts;
