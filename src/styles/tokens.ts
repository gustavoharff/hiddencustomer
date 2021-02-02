import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

let reducer = 1;
if (height < 620) {
  reducer = 0.8;
}

const SPACING = {
  XXS: 2 * reducer,
  XS: 4 * reducer,
  S: 8 * reducer,
  M: 12 * reducer,
  L: 16 * reducer,
  XL: 20 * reducer,
  XXL: 24 * reducer,
};

const COLORS = {
  WHITE: '#FFFFFF',
  BACKGROUND: '#241F2A',
  BACKGROUND_LIGHT: '#3E3A4D',
  BACKGROUND_DARK: '#1D1922',
  WARNING: '#D6872B',
  EXTRA: '#186DD0',
  SUCCESS: '#00c332',
  ALERT: '#FF4500',
  ACCENT: '#F57E20',
  FONT: '#EFEFEF',
  FONT_ACCENT: '#F57E20',
  FONT_SECONDARY: '#173E6C',
  FONT_DARK: '#173E6C',
  FONT_LIGHT: '#BFBFBF',
  FONT_LIGHTEST: 'rgba(255,255,255,0.4)',
  LIGHTEN_5: 'rgba(255,255,255,.05)',
  LIGHTEN_10: 'rgba(255,255,255,.1)',
  LIGHTEN_15: 'rgba(255,255,255,.15)',
  DARKEN_5: 'rgba(0,0,0,.05)',
  DARKEN_10: 'rgba(0,0,0,.1)',
  DARKEN_15: 'rgba(0,0,0,.15)',
};

export { COLORS, SPACING };
