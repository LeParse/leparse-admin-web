import styled from "styled-components";
import colors from "../../global/colors";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
`;

export const Form = styled.form`
  width: 40%;
  height: 75%;

  border-radius: 1.5rem;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;
  overflow: hidden;

  img {
    height: 6.39563rem;
  }
`;

export const AuthInput = styled.div`
  position: relative;

  margin-top: 4rem;

  width: 50%;
  background-color: red;

  /* display: flex; */
  align-self: center;
  justify-content: center;

  position: relative;

  svg {
    position: absolute;
    left: 4px;
    top: 0;

    width: 2rem;
    height: 2rem;

    fill: rgba(0, 0, 0, 0.5);

    &.active {
      fill: ${colors.primary};
    }
  }

  input {
    /* width: 100%; */
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);

    outline: none;

    padding-left: calc(3.5rem + 4px);
    padding-bottom: 1.2rem;

    color: rgba(0, 0, 0, 0.75);
    font-size: 1.5rem;
    font-family: Raleway;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    transition: 100ms ease;

    &:focus {
      border-color: ${colors.primary};
    }
  }

  p {
    position: absolute;

    color: rgba(0, 0, 0, 0.5);
    font-size: 1.125rem;
    font-family: Raleway;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    top: -1rem;
    bottom: 0;
    left: calc(3.5rem + 4px);

    display: flex;
    align-items: center;
    justify-content: center;

    pointer-events: none;

    transition: 100ms ease;

    &.active {
      bottom: 4rem;
      color: rgba(0, 0, 0, 0.75);
    }
  }
`;
