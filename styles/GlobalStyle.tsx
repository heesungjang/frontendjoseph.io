import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
${reset} 
html{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', "Noto Sans KR";;
    background-color: ${(p) => p.theme.bg};
}
a{
    text-decoration: none;
    color:inherit;
}
`;
