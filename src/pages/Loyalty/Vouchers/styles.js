import styled, { createGlobalStyle } from "styled-components";

import colors from "../../../global/colors";

export const GlobalStyle = createGlobalStyle`
  p {
    color: ${colors.black};
  }

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

  padding: 2rem;

  .content {
    width: 100%;
    height: 85%;

    display: flex;
    flex-direction: row;

    .leftContent,
    .rightContent {
      height: 100%;
      overflow-x: auto;
      overflow-y: auto;

      font-family: Raleway;
      font-weight: 400;
      padding-right: 1rem;
    }

    .leftContent {
      width: 77.5%;
      overflow-x: hidden;

      table {
        width: 100%;
        border-collapse: separate;
        table-layout: fixed;

        th,
        td {
          font-family: Raleway;
          padding: 1rem;
          color: ${colors.black};
        }

        th {
          opacity: 0.75;
          border-bottom: 1px solid ${colors.primary};
        }

        td {
          font-weight: 500;
        }

        td:nth-child(1) {
          font-weight: 600;
        }

        thead {
          position: sticky;
          top: 0;
          z-index: 99;

          background-color: ${colors.white};

          font-size: 1rem;
          font-weight: 600;
          text-align: left;

          user-select: none;
        }

        tbody {
          height: 5rem;
        }

        .data {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          align-items: flex-start;
          justify-content: flex-start;
        }

        td {
          height: 5rem;
          vertical-align: middle;

          p {
            width: 110%;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .datetime {
            white-space: wrap;
          }

          img {
            width: 2rem;
            height: 2rem;
            border-radius: 1rem;
            user-select: none;
          }
        }
      }
    }

    .rightContent {
      width: 32.5%;
      .title {
        font-size: 2rem;
        font-weight: 700;
        color: ${colors.black};
        margin-bottom: 2rem;
      }

      .cooming_soon {
        font-weight: 300;
        color: ${colors.black};
        margin-bottom: 2rem;
      }

      .options {
        margin-bottom: 2rem;

        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        gap: 2rem;

        #create {
          background-color: ${colors.green};
        }

        #remove {
          background-color: ${colors.red};
        }

        .option {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: 1rem;

          input {
            width: 2rem;
          }

          .value {
            width: 4rem;
          }

          p {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;

            b {
              font-weight: 700;
              opacity: 0.25;
            }
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

  .back_button {
    width: 3rem;
    height: 3rem;
    fill: ${colors.black};

    cursor: pointer;
    transition: 100ms ease;

    padding: 0.5rem;

    &:hover {
      transform: translateX(-0.25rem) scale(1.05);
      fill: ${colors.primary};
    }
  }

  .create_voucher_button {
    width: 4rem;
    height: 4rem;
    position: absolute;
    right: 1rem;
    padding: 1rem;

    transition: 100ms ease;

    cursor: pointer;

    &:hover {
      transform: translateY(-0.25rem) scale(1.05);
      fill: ${colors.green};
    }
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    p {
      font-family: Raleway;
      font-size: 1rem;
      font-weight: 400;
    }

    .inputs {
      display: flex;
      gap: 2rem;

      .input {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        input:nth-child(2) {
          width: 5rem;
        }

        input:nth-child(1) {
          width: 4rem;
        }
      }
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
    width: 10rem;

    background-color: ${colors.green};

    position: absolute;
    bottom: 2rem;
    right: 2rem;
  }
`;

export const EditModal = styled.div`
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    p {
      font-family: Raleway;
      font-size: 1rem;
      font-weight: 400;
    }

    input {
      width: 6rem;
      text-align: right;
    }

    .value {
      width: 100%;

      display: flex;
      flex-direction: row;

      align-items: center;
      justify-content: space-between;

      position: relative;
      margin-top: 1rem;

      p {
        left: 0;
        font-weight: 500;
      }

      .voucher {
        font-weight: 700;
      }

      .field {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }
    }
  }

  button {
    width: 100%;
    margin-top: 2rem;

    background-color: ${colors.orange};

    align-self: center;
  }
`;

export const VerifyMassiveCreationModal = styled.div`
  p {
    font-family: Raleway;
    font-size: 1.5rem;
    font-weight: 700;
    color: ${colors.black};
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    button {
      width: 100%;
    }
  }
`;
