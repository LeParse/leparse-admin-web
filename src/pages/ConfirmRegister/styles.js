import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  .form {
    padding: 3rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    gap: 2rem;

    p {
      font-family: Raleway;
      font-size: 1rem;
    }

    & > p {
      font-size: 1.5rem;
      font-weight: 600;
    }

    .inputs {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      gap: 1rem;
    }
  }
`;
