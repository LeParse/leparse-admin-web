import styled from "styled-components";

import colors from "../../global/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: flex-start;

  gap: 1.25rem;

  cursor: pointer;

  transition: 100ms ease;

  &:hover {
    opacity: 0.75;
  }

  p {
    color: ${colors.black};
    font-size: 1rem;
    font-family: Raleway;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 100ms ease;
  }
`;

export const Status = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.75rem;

  background-color: ${({ status }) => {
    switch (status) {
      case "online":
        return colors.green;
      case "pending-payment":
        return colors.yellow;
      case "offline":
        return colors.red;
      case "pending-setup":
        return colors.grey;
      default:
        return colors.primary;
    }
  }};
`;
