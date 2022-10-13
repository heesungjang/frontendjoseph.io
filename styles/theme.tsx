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

export type TagSize =
  | 'xs'
  | 'sm'
  | 'lg'
  | 'xl'
  | 'xl2'
  | 'xl3'
  | 'xl4'
  | 'xl5'
  | 'xl6';

export type NotionColorsTypes =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red';
const notionColors = {
  default: '#fffffc',
  gray: '#d1cccf',
  brown: '#fde4cf',
  orange: '#ffdab9',
  yellow: '#faedcb',
  green: '#d0f4de',
  blue: '#a9def9',
  purple: '#e4c1f9',
  pink: '#f1c0e8',
  red: '#f83741',
};

export const light = {
  font,
  fontWeight,
  notionColors,
  bg: '#FFFFFF',
  white: '#F5F5F5',
  black: '#404040',
  gray: '#79797A',
  darkgray: '#404040',
  lightgray: '#F1F1EF',
};
export const dark: ThemeType = {
  font,
  fontWeight,
  notionColors,
  bg: '#171717',
  white: '#404040',
  black: '#F5F5F5',
  gray: '#888888',
  darkgray: '#D4D4D4',
  lightgray: '#404040',
};

const theme = light;
export default theme;
