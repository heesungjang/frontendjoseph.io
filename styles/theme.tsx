export type ThemeType = typeof light;

const FONT_XS = 12;
const FONT_SM = 14;
const FONT_LG = 18;
const FONT_XL = 20;
const FONT_2XL = 24;
const FONT_3XL = 30;
const FONT_4XL = 36;
const FONT_5XL = 48;
const FONT_6XL = 60;

const font = {
  xs: `${FONT_XS / 16}rem`,
  sm: `${FONT_SM / 16}rem`,
  lg: `${FONT_LG / 16}rem`,
  xl: `${FONT_XL / 16}rem`,
  xl2: `${FONT_2XL / 16}rem`,
  xl3: `${FONT_3XL / 16}rem`,
  xl4: `${FONT_4XL / 16}rem`,
  xl5: `${FONT_5XL / 16}rem`,
  xl6: `${FONT_6XL / 16}rem`,
};

const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
};

export const light = {
  font,
  fontWeight,
  bg: '#FFFFFF',
  white: '#F5F5F5',
  black: '#262626',
  grey: '#79797A',
  darkGrey: '#404040',
};
export const dark: ThemeType = {
  font,
  fontWeight,
  bg: '#171717',
  white: '#F5F5F5',
  black: '#262626',
  grey: '#888888',
  darkGrey: '#D4D4D4',
};

const theme = light;
export default theme;
