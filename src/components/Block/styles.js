import styled from "styled-components";

import colors from "../../global/colors";

export const Container = styled.div`
  background-color: ${colors.white};
  border-radius: 2rem;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.5);

  padding: 2rem 2rem;
  overflow-y: hidden;
  overflow-x: hidden;

  transition: 500ms ease;

  margin: 1rem;

  position: relative;
`;
