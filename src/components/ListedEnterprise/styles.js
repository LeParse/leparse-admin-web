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

  .name {
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

    min-width: 7rem;
    width: 100%;

    flex-basis: calc(86% / 3);
  }

  .cnpj {
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

    min-width: 7rem;
    width: 100%;

    flex-basis: calc(86% / 1.5);
  }

  .phone {
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

    min-width: 10rem;
    width: 100%;

    flex-basis: calc(86% / 1.5);
  }
`;
