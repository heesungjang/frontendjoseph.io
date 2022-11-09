import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
${reset} 
html{
    background-color: ${(p) => p.theme.bg};
    font-family: "Inter", sans-serif; 
}
a{
    text-decoration: none;
    color:inherit;
}
`;
