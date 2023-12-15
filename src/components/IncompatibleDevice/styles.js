import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2rem;

  svg {
    position: fixed;
    top: 14rem;
    margin: 0 auto;
  }

  .main_text {
    font-size: 2rem;
    text-align: justify;
  }

  img {
    width: 16rem;

    position: fixed;
    top: 5rem;
    margin: 0 auto;
  }
`;
