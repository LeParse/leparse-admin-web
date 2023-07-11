import styled from "styled-components";

import colors from "../../../global/colors";

export const Container = styled.div`
  /* width: 100%;
  height: 100%; */

  display: grid;
  /* flex-wrap: wrap; */
  align-items: center;
  justify-content: center;

  /* grid-template-columns: 1.5fr 2fr;
  grid-template-rows: repeat(4, 1fr); */

  grid-template-areas:
    "users metrics"
    "users metrics"
    "stores tuitions"
    "stores tuitions";

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

  .storesList {
    width: 100%;

    display: grid;

    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);

    gap: 2rem;
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

  transition: 500ms ease;
  overflow: hidden;

  .expanded {
    /* height: 500px !important; */
    z-index: 99;
  }
`;
