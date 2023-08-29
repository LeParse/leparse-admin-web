import styled from "styled-components";

import colors from "../../global/colors";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;

  width: 100%;
  height: 20rem;

  overflow: hidden auto;

  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;

  -webkit-mask-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 5% 95%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-mask-position: center;

  mask-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 5% 95%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-position: center;
`;

export const Enterprise = styled.div`
  width: 12rem;
  height: 6rem;
  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;

  transition: 250ms ease;

  padding: 1rem;

  background-color: ${colors.black};
  cursor: pointer;

  p {
    font-family: Raleway;
    font-size: 1rem;
    font-weight: 600;
    color: ${colors.white};
  }

  &:hover {
    transform: scale(1.05);
  }

  &:hover {
    box-shadow: 0 0 15px -5px ${colors.primary};
    border: 1px solid ${colors.primary}33;
    transform: scale(
      ${({ invertAnimation }) => (invertAnimation ? 0.95 : 1.05)}
    );
  }
`;
