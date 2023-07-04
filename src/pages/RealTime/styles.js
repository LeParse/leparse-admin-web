import styled from "styled-components";

import colors from "../../global/colors";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: grid;

  grid-template-columns: 1.5fr 2fr;

  grid-template-areas:
    "users metrics"
    "stores metrics"
    "stores tuitions";

  .blockTitle {
    color: ${colors.black};
    font-size: 2rem;
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
      color: ${colors.black};
      font-size: 1.25rem;
      font-family: Raleway;
      font-style: normal;
      font-weight: 300;
      line-height: normal;
    }
  }
`;
