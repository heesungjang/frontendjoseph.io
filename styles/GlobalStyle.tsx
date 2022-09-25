import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import NotoRegular from '../fonts/NotoSansKR-Regular.otf';
import NotoBlack from '../fonts/NotoSansKR-Black.otf';
import NotoBold from '../fonts/NotoSansKR-Bold.otf';
import NotoLight from '../fonts/NotoSansKR-Light.otf';
import NotoMedium from '../fonts/NotoSansKR-Medium.otf';
import NotoThin from '../fonts/NotoSansKR-Thin.otf';

export const FontStyles = createGlobalStyle`

@font-face {
  font-family: 'Noto Sans KR';
  src: url(${NotoRegular}) format('otf'),
       url(${NotoBold}) format('oft'),
       url(${NotoLight}) format('oft'),
       url(${NotoMedium}) format('oft'),
       url(${NotoThin}) format('oft'),
       url(${NotoBlack}) format('oft'),
}
`;

export const GlobalStyle = createGlobalStyle`
${reset} 
html{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',  'Noto Sans KR', sans-serif
}

a{
    text-decoration: none;
    color:inherit;
}

`;
