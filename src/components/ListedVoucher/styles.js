import styled from "styled-components";
import { m } from "framer-motion";

import colors from "../../global/colors";

export const Container = styled(m.div)`
  width: 100%;

  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 1rem;

  transition: 100ms ease;

  svg {
    width: 1.25rem;
    transition: 100ms ease;

    &:hover {
      fill: ${colors.orange};

      cursor: pointer;
    }
  }

  .code {
    color: ${colors.black};
    font-size: 1rem;
    font-family: Raleway;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    align-self: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 100ms ease;

    width: 7rem;
  }

  .enterprise {
    color: ${colors.black};
    font-size: 1rem;
    font-family: Raleway;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    align-self: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 100ms ease;

    width: 5rem;
  }

  .value {
    color: ${colors.black};
    font-size: 1rem;
    font-family: Raleway;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    align-self: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 100ms ease;
  }
`;
