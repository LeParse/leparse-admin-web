import styled, { createGlobalStyle } from "styled-components";

import colors from "../../../global/colors";

export const GlobalStyle = createGlobalStyle`
  .modalHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 1.25rem;
    }

    p, input {
      font-family: Raleway;
      font-size: 1.25rem;
      overflow-x: hidden;
      overflow-y: visible;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0.25rem 0;
    }
  }

  .modalUser {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;

    input {
      max-width: 14vw;
    }
  }

  .modalClose {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    svg {
      width: 1.25rem;
      height: 1.25rem;
      fill: ${colors.black};

      cursor: pointer;

      transition: 100ms ease;

      &:hover {
        transform: translateY(-0.25rem) scale(1.05);
        opacity: 1;
        fill: ${colors.red};
      }
    }
  }

  .modalStores {
    width: 100%;
    max-height: 57.5vh;

    padding: 1rem;

    overflow-y: auto;

    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 1rem;
  }

  .modalStore {
    width: 100%;
    
    padding: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 1rem;

    user-select: none;
    cursor: pointer;

    transition: 100ms ease;

    p {
      font-family: Raleway;
      font-size: 1rem;
      font-weight: 600;
      color: ${colors.white}
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  .modalFooter {
    width: calc(100% - 6rem);
    position: absolute;
    bottom: 1.5rem;
    left: 3rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 1rem;

  table {
    width: 100%;

    border-collapse: separate;

    th,
    td {
      font-family: Raleway;
      padding: 2rem 1rem;
      color: ${colors.black};
      font-weight: 500;
    }

    td:nth-child(2) {
      font-weight: 600;
    }

    th {
      padding-top: 0.5rem;
      opacity: 0.75;
      border-bottom: 1px solid ${colors.primary};
    }

    thead {
      position: sticky;
      top: 0;
      z-index: 99;

      text-align: left;
      font-size: 1.25rem;
      font-weight: 700;
      user-select: none;
      background-color: ${colors.white};
    }

    tr {
      .data {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: flex-start;
        justify-content: flex-start;
      }

      td {
        padding-bottom: 0;
        vertical-align: top;

        align-self: center;

        p {
          margin-top: 0.5rem;
        }

        img {
          width: 2rem;
          height: 2rem;
          border-radius: 1rem;
          user-select: none;
        }

        svg {
          width: 1.5rem;
          height: 1.5rem;
          cursor: pointer;

          user-select: none;

          transition: 100ms ease;

          &:hover {
            transform: translateY(-0.25rem);
            fill: ${colors.orange};

            &:nth-child(2) {
              fill: ${colors.red};
            }
          }
        }
      }
    }

    .editContainer {
      position: absolute;
      width: 100%;
      height: 50%;

      z-index: 0;

      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      padding: 0 1rem;

      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 0 0 1rem 1rem;

      img {
        width: 2rem;
        height: 2rem;
        border-radius: 1rem;
        user-select: none;
      }

      input {
        margin-left: 0.75rem;
      }

      button {
        &:nth-child(3) {
          margin-left: 5.75rem;
        }

        &:nth-child(4) {
          position: absolute;
          right: 1rem;
        }
      }
    }

    .actions {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      align-items: center;
      justify-content: flex-end;

      svg {
        padding: 0.5rem;
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: flex-start;

  gap: 1rem;

  margin-bottom: 2rem;

  user-select: none;

  h1 {
    font-family: Raleway;
    font-size: 2rem;
    font-weight: 900;
    color: ${colors.black};
  }

  svg {
    width: 2rem;
    height: 2rem;
    fill: ${colors.black};

    cursor: pointer;
    transition: 100ms ease;

    &:hover {
      transform: translateX(-0.25rem) scale(1.05);
      fill: ${colors.primary};
    }
  }

  #createButton {
    position: absolute;
    right: 2rem;

    padding: 0.5rem;

    &:hover {
      transform: translateY(-0.25rem);
      fill: ${colors.green};
    }
  }
`;

export const CreateModal = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;

  .modalHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    gap: 5rem;

    color: ${colors.black};

    p {
      font-family: Raleway;
      font-size: 1.5rem;
      font-weight: 900;
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
    width: 100%;
    height: 100%;

    display: grid;

    grid-template-columns: 1fr 0.1fr 2fr;

    gap: 1rem;

    overflow: auto;

    .field {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      background-color: red;
      gap: 2rem;

      p {
        font-family: Raleway;
        font-size: 1rem;
        font-weight: 400;
      }

      input {
        width: 6rem;
        text-align: right;
      }
    }

    .left {
      grid-column-start: 1;

      display: grid;
      height: 100%;

      grid-template-areas:
        "name nameInput"
        "user userInput"
        "email emailInput";

      p,
      input {
        align-self: center;
        font-family: Raleway;
        color: ${colors.black};
      }

      p {
        font-weight: 700;
        opacity: 0.5;
      }

      input {
        font-weight: 700;
      }
    }

    .right {
      grid-column-start: 3;
      height: 100%;
      overflow-x: visible;
      overflow-y: auto;
      position: relative;

      padding-top: 2rem;
      padding-bottom: 2rem;

      -webkit-mask-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 7.5% 92.5%,
        rgba(0, 0, 0, 0) 100%
      );
      -webkit-mask-position: center;

      mask-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 7.5% 92.5%,
        rgba(0, 0, 0, 0) 100%
      );
      mask-position: center;
    }
  }

  button {
    width: 12%;
    height: 4rem;
    margin-top: 2rem;

    background-color: ${colors.green};

    align-self: flex-end;
  }
`;
