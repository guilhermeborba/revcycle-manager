import styled from 'styled-components';

export const AuthContainer = styled.div`
  max-width: 420px;
  margin: 64px auto;
  padding: 24px;
  border-radius: 12px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px; /* Espaçamento entre os elementos */

  h1 {
    margin-bottom: 8px; /* Ajuste no título */
    color: ${(props) => props.theme.colors.text};
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px; /* Espaçamento entre os inputs e botão */
  }

  label {
    display: block;
    margin-bottom: 4px;
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: 0.9rem;
  }

  input[type="email"],
  input[type="password"],
  input[type="text"] {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid ${(props) => props.theme.colors.gray300};
    border-radius: 6px;
    background-color: ${(props) => props.theme.colors.gray100};
    color: ${(props) => props.theme.colors.text};
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(${(props) => props.theme.colors.primaryRgb}, 0.2);
    }
  }

  button[type="submit"] {
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.colors.primaryDark};
    }

    &:disabled {
      background-color: ${(props) => props.theme.colors.gray400};
      cursor: not-allowed;
    }
  }

  p {
    text-align: center;
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: 0.9rem;

    a {
      color: ${(props) => props.theme.colors.primary};
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .error-message {
    color: ${(props) => props.theme.colors.danger};
    text-align: center;
    font-size: 0.9rem;
  }
`;