import styled from "styled-components";

import colors from "../../../global/colors";

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;

  gap: 1.5rem;

  padding-bottom: 1rem;
  padding-right: 1rem;

  padding: 1rem;

  grid-template-areas:
    "title title"
    "users metrics"
    "users metrics"
    "users tuitions";

  .blockTitle {
    color: ${colors.black};
    font-size: 1.5rem;
    font-family: Raleway;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .usersList {
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 1.5rem;
  }

  .tuitions {
    p {
      color: ${colors.black};
      font-family: Raleway;
      font-style: normal;
      line-height: normal;

      &:nth-child(1) {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      &:nth-child(2) {
        font-size: 1rem;
        font-weight: 400;
        opacity: 0.5;
      }
    }
  }

  .seeMore {
    display: flex;
    flex-direction: row;

    align-items: center;

    gap: 1rem;

    position: absolute;

    bottom: 2rem;
    right: 2rem;

    cursor: pointer;

    transition: 100ms ease;

    &:hover {
      opacity: 0.75;
    }

    p {
      text-decoration: none;
      color: ${colors.black};
      font-size: 1.25rem;
      font-family: Raleway;
      font-style: normal;
      font-weight: 300;
      line-height: normal;
    }
  }

  overflow: auto;
`;

export const Title = styled.div`
  grid-area: title;
  padding: 2rem 2rem;

  p {
    font-family: Raleway;
    font-size: 3rem;
    font-weight: 300;
    color: ${colors.white};
  }
`;
