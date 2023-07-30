import styled from "styled-components";
import { m } from "framer-motion";

import colors from "../../global/colors";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Store = styled(m.div)`
  width: 12rem;
  height: 6rem;
  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;

  transition: 250ms ease;

  padding: 1rem;

  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: pointer;

  p {
    font-family: Raleway;
    font-size: 1rem;
    font-weight: 600;
    color: ${colors.white};
  }

  &:hover {
    transform: scale(1.05);
  }

  &:hover {
    box-shadow: 0 0 15px -5px ${colors.primary};
    border: 1px solid ${colors.primary}33;
    transform: scale(
      ${({ invertAnimation }) => (invertAnimation ? 0.95 : 1.05)}
    );
  }
`;
