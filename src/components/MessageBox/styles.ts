import styled, { keyframes } from 'styled-components';

const animate = keyframes`
  0% {
    transform: translateX(-100px);
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
`;

export const Container = styled.div`
  width: 48%;
  height: 260px;
  margin: 10px 0;
  padding: 30px 20px;
  border-radius: 7px;

  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.white};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  animation: ${animate} 0.5s;

  > header img {
      width: 35px;
      margin-left: 10px;
  }

  > header p {
    font-size: 18px;
  }

  @media(max-width: 770px) {
    width: 100%;
    > header h2 {
      font-size: 24px;

      img {
        width: 20px;
        height: 20px;
      }
    }

    > header p, > footer span {
      font-size: 14px;
    }


    @media(max-width: 420px) {
      width: 100%;
      height: auto;

      > header p {
        margin-bottom: 15px;
      }
    }
  }
`;