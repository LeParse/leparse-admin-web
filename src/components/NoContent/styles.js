import styled from "styled-components";

import colors from "../../global/colors";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 2rem;

  opacity: 0.5;

  p {
    font-family: Raleway;
    font-size: 2rem;
    font-weight: 700;
    color: ${colors.black};
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
    fill: ${colors.black};
  }
`;
