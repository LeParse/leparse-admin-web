import styled from "styled-components";

import colors from "../../../global/colors";

export const Container = styled.div`
  width: 99%;

  margin-top: 1rem;
  /* margin-left: -1rem; */

  border-radius: 2rem;

  overflow: hidden;

  .blockTitle {
    color: ${colors.black};
    font-size: 1.5rem;
    font-family: Raleway;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .blockSubtitle {
    color: ${colors.black};
    font-size: 1.15rem;
    font-family: Raleway;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 2rem;
  }

  .dataHalfer {
    display: grid;

    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  .dropzoneSelected {
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 15px -10px ${colors.primary};
  }

  #storesGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`;

export const Content = styled.div`
  display: grid;
  height: 87.5%;

  grid-template-columns: 0.9fr 0.2fr 0.9fr;
`;

export const Half = styled.div`
  width: 100%;
`;

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-bottom: 2rem;

  p,
  input {
    font-family: Raleway;
    color: ${colors.black};
  }

  p {
    font-size: 0.9rem;
  }

  input {
    font-size: 1rem;
    border: none;
    outline: none;
    padding: 1rem;
    padding-left: 0.5rem;

    transition: 100ms ease;

    &:focus {
      border-bottom: 1px solid ${colors.primary};
    }
  }
`;

export const Address = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const EnterpriseContainer = styled.div`
  width: 235px;
  height: 335px;
  border-radius: 1rem;

  background: rgb(27, 27, 27);
  background: linear-gradient(
    315deg,
    rgba(27, 27, 27, 1) 0%,
    rgba(64, 64, 64, 1) 50%,
    rgba(27, 27, 27, 1) 100%
  );

  background-size: 150% 150%;

  background-position: 0% 0%;

  box-shadow: 0 0 15px -5px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;

  padding: 1.5rem;

  transition: 100ms ease;

  user-select: none;

  &:hover {
    box-shadow: 0 0 15px 0px ${colors.primary};

    background-position: 100% 100%;
  }

  h2 {
    font-family: Raleway;
    font-size: 1rem;
    font-weight: 600;
    color: ${colors.white};
    margin-bottom: 2rem;
  }

  p {
    font-family: Raleway;
    font-size: 1rem;
    font-weight: 300;
    color: ${colors.white};
    margin-bottom: 0.5rem;
    line-height: 1.25rem;
  }

  img {
    width: 2.25rem;
    height: 2.25rem;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }

  div:nth-child(2) {
    margin-bottom: 3rem;
  }

  #share {
    top: 1.25rem;
    right: 1.25rem;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    transition: 100ms ease;

    &:hover {
      filter: brightness(0.85);
    }
  }

  #id {
    font-weight: 300;
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    font-size: 1rem;

    user-select: text;
  }
`;

export const Drop = styled.div`
  width: 10rem;
  height: 10rem;
  margin-bottom: 2rem;
  position: relative;
  cursor: pointer;

  overflow: hidden;

  img:nth-child(2) {
    width: 100%;
    height: 100%;
    opacity: 0.75;
  }

  #logoPreview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    transition: 250ms ease;

    object-fit: cover;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }

  border-radius: 1rem;

  background-image: repeating-linear-gradient(
      180deg,
      #00000026,
      #00000026 10px,
      transparent 10px,
      transparent 2rem,
      #00000026 2rem
    ),
    repeating-linear-gradient(
      270deg,
      #00000026,
      #00000026 10px,
      transparent 10px,
      transparent 2rem,
      #00000026 2rem
    ),
    repeating-linear-gradient(
      0deg,
      #00000026,
      #00000026 10px,
      transparent 10px,
      transparent 2rem,
      #00000026 2rem
    ),
    repeating-linear-gradient(
      90deg,
      #00000026,
      #00000026 10px,
      transparent 10px,
      transparent 2rem,
      #00000026 2rem
    );
  background-size: 1px calc(100% + 37px), calc(100% + 37px) 1px,
    1px calc(100% + 37px), calc(100% + 37px) 1px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
  animation: borderAnimation 5s infinite linear;

  transition: 250ms ease;

  &:hover {
    opacity: 0.75;
  }
`;

export const Store = styled.div`
  min-height: 5rem;
  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;

  transition: 250ms ease;

  padding: 1rem;

  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: pointer;

  textarea {
    max-width: 60%;
    height: 60%;
    border: none;
    outline: none;
    padding: 0.5rem;
    padding-left: 0.25rem;
    transition: 100ms ease;
    resize: none;
    position: absolute;

    font-family: Raleway;
    font-size: 1.1rem;
    font-weight: 600;

    background-color: transparent;

    color: ${colors.white};

    &::placeholder {
      color: ${colors.white};
      opacity: 0.5;
    }
  }

  img {
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 1rem;
    right: 1rem;

    transition: 100ms ease;

    &:nth-child(3) {
      top: unset;
      bottom: 0.5rem;
      right: 0.5rem;
      width: 3rem;
      height: 3rem;
    }

    &:nth-child(2):hover {
      margin-top: -0.25rem;
      transform: scale(1.05);
    }

    &:nth-child(3):hover {
      margin-bottom: 0.25rem;
      transform: scale(1.05);
    }
  }

  &:hover {
    box-shadow: 0 0 15px -5px ${colors.primary};
    border: 1px solid ${colors.primary}33;
  }
`;

export const AddStore = styled.div`
  width: 3rem;
  min-height: 7rem;

  align-self: center;
  border-radius: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Raleway;
  font-size: 2.5rem;
  color: ${colors.white};

  background-color: ${colors.primary};
  justify-self: flex-start;

  cursor: pointer;

  transition: 250ms cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    transform: scale(1.05);
  }
`;
