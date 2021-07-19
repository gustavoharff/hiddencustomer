const SPACING = {
  XXS: 2,
  XS: 4,
  S: 8,
  M: 12,
  L: 16,
  XL: 20,
  XXL: 24,
};

const BODY = {
  XXS: {
    SIZE: 8,
    HEIGHT: 12,
  },
  XS: {
    SIZE: 11,
    HEIGHT: 16,
  },
  S: {
    SIZE: 14,
    HEIGHT: 20,
  },
  M: {
    SIZE: 16,
    HEIGHT: 24,
  },
  L: {
    SIZE: 20,
    HEIGHT: 24,
  },
  XL: {
    SIZE: 24,
    HEIGHT: 28,
  },
  XXL: {
    SIZE: 28,
    HEIGHT: 32,
  },
};

export const TITLE = {
  XS: {
    SIZE: 12,
    HEIGHT: 16,
  },
  S: {
    SIZE: 18,
    HEIGHT: 24,
  },
  M: {
    SIZE: 22,
    HEIGHT: 28,
  },
  L: {
    SIZE: 26,
    HEIGHT: 32,
  },
  XL: {
    SIZE: 36,
    HEIGHT: 40,
  },
  XXL: {
    SIZE: 42,
    HEIGHT: 48,
  },
};

export const FONT_WEIGHT = {
  THIN: '300',
  NORMAL: '400',
  MEDIUM: '500',
  BOLD: '600',
  EXTRA: '700',
};

const COLORS = {
  WHITE: '#E1E1E6',
  BACKGROUND_DARK: 'rgb(24, 23, 25)',
  BACKGROUND_LIGHT: '#303033',
  BACKGROUND: '#1e1d20',
  WARNING: '#D6872B',
  EXTRA: '#186DD0',
  SUCCESS: '#67E480',
  ALERT: '#E96379',
  ACCENT: '#F57E20',
  FONT: '#E1E1E6',
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

export { COLORS, BODY, SPACING };
