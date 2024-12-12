import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Title-Font';
    src: url('/assets/SAIBA-45.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'Description-Font';
    src: url('/assets/broken-console.ttf') format('truetype');
    font-display: swap;
  }

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
    font-family: 'Title-Font', 'Description-Font', sans-serif;
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
