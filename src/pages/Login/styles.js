import styled, { keyframes } from "styled-components";
import colors from "../../global/colors";

const loginAnimation = keyframes`
  25% {
    width: 40%;
  }

  50% {
    width: 48px;
  }

  100% {
    width: 64px;
  }
`;

const backgroundGradient = keyframes`
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(
    -45deg,
    #50c5f7bf,
    ${colors.primary}bf,
    #079786bf,
    #076c97bf
  );
  background-size: 200% 200%;
  animation: ${backgroundGradient} 25s ease infinite;
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

export const LoginButton = styled.button.attrs({ type: "submit" })`
  width: 35%;
  height: 64px;

  background-color: ${colors.primary};

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 32px;
  border: none;

  color: #fff;
  font-size: 1.5rem;
  font-family: Raleway;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-top: 2.75rem;

  z-index: 1;
  cursor: pointer;

  transition: 100ms ease;

  &:hover {
    transform: scale(0.95);
  }

  &.clicked {
    animation: ${loginAnimation} 500ms forwards ease;
    color: transparent;

    padding-top: 1rem;
  }
`;
