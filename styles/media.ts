import { generateMedia } from 'styled-media-query';

export const BREAKPOINT_SM = 700;
export const BREAKPOINT_MD = 768;
export const BREAKPOINT_LG = 1023;

export const media = generateMedia({
  sm: `${BREAKPOINT_SM / 16}rem`,
  md: `${BREAKPOINT_MD / 16}rem`,
  lg: `${BREAKPOINT_LG / 16}rem`,
});
