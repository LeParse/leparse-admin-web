import styled from "styled-components";

import colors from "../../global/colors";

export const Container = styled.div`
  width: 100%;

  display: grid;

  grid-template-areas: "icon name stores stores details";

  justify-content: center;
  gap: 1.25rem;

  transition: 100ms ease;

  &:hover {
    color: ${colors.primary};
    fill: ${colors.primary};

    .name {
      color: ${colors.primary};
    }

    .stores {
      color: ${colors.primary};
    }

    cursor: pointer;
  }

  .name {
    grid-area: name;
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
  }

  .stores {
    grid-area: stores;
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
