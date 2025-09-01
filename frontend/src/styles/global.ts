import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto', sans-serif;
  }

  button, input, textarea {
    font-family: 'Roboto', sans-serif;
  }
`;
