import styled from 'styled-components';

interface IContainerProps {
  color: string;
}

export const Container = styled.div<IContainerProps>`
  width: 32%;
  height: 150px;
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 7px;

  color: ${props => props.theme.colors.white};
  background-color: ${props => props.color};

  position: relative;
  overflow: hidden;

  > img {
    height: 110%;
    position: absolute;
    top: -10px;
    right: -30px;

    opacity: 0.3;
  }

  > span {
    font-size: 18px;
    font-weight: bold;
  }

  > small {
    font-size: 12px;
    position: absolute;
    bottom: 10px;
  }

  @media(max-width: 770px) {
    > span {
      font-size: 14px;
    }

    > h1 {
      word-wrap: break-word;
      font-size: 22px;
    
      > strong {
        display: inline-block;
        width: 100%;
        font-size: 16px;
      }
    }
  }

  @media(max-width: 420px) {
    width: 100%;

    > h1 {
      display: flex;

      > strong {
        position: initial;
        width: auto;
        font-size: 22px;
      }

      > strong::after {
        display: inline-block;
        content: ' ';
        width: 1px;
      }

    }
  }

`;