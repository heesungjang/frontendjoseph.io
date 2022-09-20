import { generateMedia } from 'styled-media-query';

export const BREAKPOINT_XS = 480;
export const BREAKPOINT_SM = 576;
export const BREAKPOINT_MD = 768;
export const BREAKPOINT_LG = 992;
export const BREAKPOINT_XL = 1366;
export const BREAKPOINT_XXL = 1600;

export const media = generateMedia({
  xs: `${BREAKPOINT_XS / 16}rem`,
  sm: `${BREAKPOINT_SM / 16}rem`,
  md: `${BREAKPOINT_MD / 16}rem`,
  lg: `${BREAKPOINT_LG / 16}rem`,
  xl: `${BREAKPOINT_XL / 16}rem`,
  xxl: `${BREAKPOINT_XXL / 16}rem`,
});
