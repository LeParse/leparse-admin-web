import styled from "styled-components";
import { m } from "framer-motion";

export const Container = styled(m.div)`
  width: 100%;
  position: relative;

  border-radius: 1rem;

  overflow: ${({ compact }) => {
    if (compact) {
      return "visible";
    } else {
      return "hidden";
    }
  }};

  cursor: pointer;

  p {
    font-family: Raleway;
    font-size: 1.25rem !important;
    font-weight: 500;
  }

  .selectedItem {
    width: 100%;
    height: 3.25rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }

  .list {
    width: 100%;
    position: ${({ compact }) => {
      if (compact) {
        return "absolute";
      } else {
        return "relative";
      }
    }};
    top: ${({ compact }) => {
      if (compact) return "3.25rem";
      else return undefined;
    }};
    border-radius: ${({ compact }) => {
      if (compact) {
        return "1rem";
      } else return undefined;
    }};

    overflow: hidden;

    z-index: 999;

    p {
      padding: 1rem;
      width: 100%;
      background: white;
      transition: 100ms ease;

      &:hover {
        filter: brightness(0.95);
      }
    }
  }
`;
