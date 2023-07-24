import styled from "styled-components";

import colors from "../../global/colors";

import { m } from "framer-motion";

export const Overlay = styled(m.div)`
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: -9.076rem;
  background-color: rgba(255, 255, 255, 0.85);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const Content = styled(m.div)`
  background-color: ${colors.white};
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2rem;

  width: 100%;
  height: 100%;
  padding: 3rem;

  box-shadow: 0 0 1.5rem -0.5rem rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.25);
`;
