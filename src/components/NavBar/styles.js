import styled from "styled-components";

import colors from "../../global/colors";

export const Container = styled.div`
  width: 4rem;
  height: 75vh;
  margin-top: calc(12.5vh - 1.75rem);

  border-radius: 0rem 4rem 4rem 0rem;
  background: #fff;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  padding: 0 1rem;
  padding-top: 3.5rem;

  overflow: hidden;

  & > #logo {
    width: 4rem;
    height: 4rem;

    border-radius: 2rem;

    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
  }

  .pageLinks {
    width: 100%;
    margin-top: 4.5rem;

    position: relative;
  }

  #logout {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    width: 100%;

    padding-left: 2rem;

    text-decoration: none;
    color: ${colors.red};
    font-size: 1.5rem;
    font-family: Raleway;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    transition: 100ms ease;

    &:hover {
      filter: brightness(0.85);
    }

    img {
      margin-right: 5.25rem;
    }
  }

  transition: 100ms ease;

  &:hover {
    width: 18.5rem;

    #version {
      opacity: 1;
    }

    #logo {
      width: 7rem;
      height: 7rem;
      border-radius: 1.5rem;
    }
  }
`;

export const PageLink = styled.div`
  width: 100%;
  height: 64px;

  border-radius: 2rem;
  background-color: transparent;

  overflow: hidden;

  opacity: 0.75;

  margin-bottom: 16px;

  a {
    width: 100%;
    height: 100%;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    color: ${colors.primary};
    text-decoration: none;

    font-size: 1.25rem;
    font-family: Raleway;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    padding-left: 1.25rem;

    transition: 100ms ease;

    img {
      margin-right: 1.5rem;
      max-width: 1.5rem;
      max-height: 2.15388rem;
    }
  }

  transition: 100ms ease;

  &.active {
    opacity: 1;

    a {
      color: ${colors.white};
    }
  }
`;

export const PageSelector = styled.div`
  background-color: ${colors.primary};
  width: 100%;
  height: 64px;
  border-radius: 2rem;

  position: absolute;
  z-index: 0;

  transition: 100ms ease;
`;

export const Footer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 1.3rem;

  & > #version {
    opacity: 0;
    transition: 100ms ease;

    margin-top: 3.2rem;

    color: rgba(0, 0, 0, 0.25);
    font-size: 1rem;
    font-family: Raleway;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    text-align: center;
  }
`;
