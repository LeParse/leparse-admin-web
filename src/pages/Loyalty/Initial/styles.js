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

  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(5, 1fr);

  grid-template-areas:
    "title title"
    "vouchers users"
    "vouchers users"
    "vouchers enterprises"
    "vouchers enterprises";

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
    height: 40%;

    display: flex;
    flex-direction: column;

    gap: 1.5rem;

    overflow-y: auto;
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
  }

  .vouchersList {
    width: 100%;
    height: 75%;

    display: flex;
    flex-direction: column;

    gap: 1.5rem;

    overflow-y: auto;
    padding-right: 1rem;
    margin-bottom: 2.5rem;

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
  }

  .enterprisesList {
    width: 100%;
    height: 45%;

    display: flex;
    flex-direction: column;

    gap: 1.5rem;

    overflow-y: auto;
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
  }

  .seeMore {
    display: flex;
    flex-direction: row;

    background-color: #fff;
    width: 100%;
    height: 4rem;
    left: 0;
    bottom: 0;

    align-items: center;
    justify-content: flex-end;
    padding-right: 2rem;

    gap: 1rem;

    position: absolute;

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
  padding: 2rem 0 1rem 0;

  img {
    height: 4rem;
  }
`;

export const CreateVoucherModal = styled.div`
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

export const EditVoucherModal = styled.div`
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
      }

      .voucher {
        font-weight: 600;
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

export const CreateUserModal = styled.div`
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

export const CreateEnterpriseModal = styled.div`
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
        "cnpj cnpjInput"
        "phone phoneInput";

      p,
      input {
        align-self: center;
        font-family: Raleway;
        color: ${colors.black};
      }

      p {
        font-weight: 700;
        opacity: 0.5;
        cursor: pointer;
      }

      input {
        font-weight: 700;
      }
    }

    .right {
      grid-column-start: 3;
      height: 100%;

      overflow: auto;

      p,
      input {
        align-self: center;
        font-family: Raleway;
        color: ${colors.black};
      }

      p {
        font-weight: 700;
        opacity: 0.5;
        cursor: pointer;
      }

      input {
        font-weight: 700;
      }

      .header {
        width: "100%";
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;

        input {
          width: 8rem;
        }
      }

      .addressInputs {
        width: 100%;
        height: 70%;
        display: flex;
        gap: 1rem;
        position: relative;

        flex-wrap: wrap;
      }
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
