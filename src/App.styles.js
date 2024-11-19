import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul, ol {
    list-style: none;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Public Sans', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }
`;

export default GlobalStyles;
