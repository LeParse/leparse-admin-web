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
    "users vouchers"
    "users vouchers"
    "users tuitions";

  .blockTitleContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    svg {
      transition: 100ms ease;

      cursor: pointer;

      &:hover {
        transform: translateY(-0.15rem) scale(1.05);
        fill: ${colors.green};
      }
    }
  }

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

    background-color: #fff;
    width: 100%;
    height: 5rem;
    left: 0;

    align-items: center;
    justify-content: flex-end;
    padding-right: 2rem;

    gap: 1rem;

    position: absolute;

    bottom: 0;

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

export const CreateModal = styled.div`
  display: flex;
  flex-direction: column;

  .modalHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    gap: 5rem;

    p {
      font-family: Raleway;
      font-size: 1.5rem;
      font-weight: 600;
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;

      cursor: pointer;

      fill: ${colors.black};
      transition: 100ms ease;

      &:hover {
        transform: translateY(-0.25rem) scale(1.05);
        fill: ${colors.red};
      }
    }
  }

  .modalContent {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    p {
      font-family: Raleway;
      font-size: 1rem;
      font-weight: 400;
    }

    input {
      width: 6rem;
    }

    .value {
      display: flex;
      flex-direction: row;

      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
  }

  button {
    width: 100%;
    margin-top: 2rem;

    background-color: ${colors.green};

    align-self: center;
  }
`;
