import styled from "styled-components";
import { m } from "framer-motion";

import colors from "../../global/colors";

export const Container = styled(m.div)`
  overflow: hidden;
  position: relative;
  width: 2rem;
  height: 2.7rem;

  z-index: 1;
  opacity: 0.5;

  transition: 100ms ease;

  input {
    padding: ${({ inverted }) =>
      inverted ? "0 0.5rem 0 2rem" : "0 2rem 0 0.5rem"};
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;

    fill: ${colors.black};

    cursor: pointer;

    transition: 100ms ease;

    z-index: 1;

    position: absolute;
    top: 0.65rem;
    right: ${({ inverted }) => (inverted ? "unset" : 0)};
    left: ${({ inverted }) => (inverted ? 0 : "unset")};

    &:hover {
      transform: scale(1.05);
    }
  }

  &:focus-within {
    opacity: 1;

    input {
      border-color: ${colors.primary};
    }

    svg {
      fill: ${colors.primary};
    }
  }

  &:hover {
    opacity: 1;
  }
`;

export const Input = styled(m.input)`
  width: 12rem;
  height: 2.5rem;

  outline: none;

  border: 0;

  color: ${colors.black};
  z-index: 0;
  background-color: red;

  font-size: 1.1rem;
  background-color: transparent;
  border-bottom: 1px solid ${colors.black};
`;
