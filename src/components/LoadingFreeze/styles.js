import styled from "styled-components";

import AnimatedPage from "../AnimatedPage";

export const Container = styled(AnimatedPage)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);

  display: flex;
  align-items: center;
  justify-content: center;
`;
