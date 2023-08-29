import styled from "styled-components";

import colors from "../../global/colors";

export const Container = styled.button`
  width: 7rem;
  height: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${colors.primary};

  padding: 1rem;

  border-radius: 2rem;
  border: none;

  color: #fff;
  font-size: 1rem;
  font-family: Raleway;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  z-index: 1;
  cursor: pointer;

  transition: 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;

  &:hover {
    transform: scale(0.95);
  }

  &.clicked {
    width: 4rem !important;
    color: transparent;
    background-color: ${colors.grey};

    padding-top: 1rem;
  }
`;
