import { createGlobalStyle } from "styled-components";

import colors from "../../global/colors";

export const GlobalStyle = createGlobalStyle`
  input {
    background-color: transparent;
    font-family: Raleway;
    color: ${colors.black};
    font-size: 1rem;
    border: none;
    outline: none;
    padding: 1rem;
    padding-left: 0.5rem;

    transition: 100ms ease;

    &:focus {
      border-bottom: 1px solid ${colors.primary};
    }
  }
`;
